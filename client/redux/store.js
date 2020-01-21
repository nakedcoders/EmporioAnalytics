/**
 * Redux Store
 */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import RootSaga from "./sagas";

const makeStore = (initialState, options) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  );

  // sagaMiddleware.run(RootSaga);
  store.sagaTask = sagaMiddleware.run(RootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  store.subscribe(() => {
    store.getState();
  });

  return store;
};


export default makeStore;
