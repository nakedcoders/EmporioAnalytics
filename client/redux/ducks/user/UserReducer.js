import * as types from "./UserTypes"
import Api from '../../../api/axios'
import Router from 'next/router'

const INIT_STATE = {
  accessToken: null,
  profile: null
}

export default async(state = INIT_STATE, action) => {
  switch(action.type){
    case types.SAVE_ACCESS_TOKEN_SUCCESS:

      await Api.AuthorizationHeader(action.payload)

      Router.push('/dashboard')  

      return {
        ...state,
        accessToken: action.payload
      }

    case types.SAVE_USER_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case types.LOGOUT_ACCOUNT_SUCCESS:

      await Api.clearToken()

      Router.push('/')   

      return {
        ...state,
        accessToken: null,
        profile: null
      }

    case types.LOGOUT_ACCOUNT_FAILURE:
      return {
        ...state,
      }
                
    default:
      return {...state}
  }
}