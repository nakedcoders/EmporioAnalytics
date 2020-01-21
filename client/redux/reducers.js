/**
 * App Reducers
 */
import { combineReducers } from "redux"

import { UserReducer } from "./ducks/user"

const reducers = combineReducers({
  UserState: UserReducer
})

export default reducers