/**
 * Root Sagas
 */
import { all } from "redux-saga/effects"

// import Sagas
import { UserSaga } from "./ducks/user"

export default function* rootSaga() {
  yield all([
    UserSaga()
  ])
}