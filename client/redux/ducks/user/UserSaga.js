import { 
  all, 
  call, 
  fork, 
  put, 
  takeEvery, 
  takeLatest, 
  select, 
  delay 
} from "redux-saga/effects"

import * as types from "./UserTypes"
import * as actions from "./UserActions"
import api from "../../../api/axios"

//=========================
// REQUESTS
//=========================

const userLogoutRequest = async(e) => {
  const data = await api.get(`/user/logout`)
  return data
}


//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* userLogout(e) {
  try {
    const data = yield call(userLogoutRequest, e)
    yield put(actions.handleAccountLogout_success(data))
  } catch (error) {
    yield put(actions.handleAccountLogout_failure(error))
  }
}


//=======================
// WATCHER FUNCTIONS
//=======================
export function* userLogoutWatcher() {
  yield takeEvery(types.LOGOUT_ACCOUNT, userLogout)
}



//=======================
// FORK SAGAS TO STORE
//=======================
export default function* productSaga() {
  yield all([
    fork(userLogoutWatcher),

  ])
}
