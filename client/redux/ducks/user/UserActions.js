import * as types from "./UserTypes";


export const saveAccessTokenSuccess = e => ({
  type: types.SAVE_ACCESS_TOKEN_SUCCESS,
  payload: e
})

export const saveUserProfile = e => ({
  type: types.SAVE_USER_PROFILE,
  payload: e
})

export const handleAccountLogout = e => ({
  type: types.LOGOUT_ACCOUNT,
  payload: e
})

export const handleAccountLogout_success = e => ({
  type: types.LOGOUT_ACCOUNT_SUCCESS,
  payload: e
})

export const handleAccountLogout_failure = e => ({
  type: types.LOGOUT_ACCOUNT_FAILURE,
  payload: e
})



