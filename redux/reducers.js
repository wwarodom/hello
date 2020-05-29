import { combineReducers } from 'redux'
import * as types from './types'

const userReducer = (state = 0, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return { user: payload.user, token: payload.token }
    case types.LOGIN_FAILED:
      return { error: payload.error }
    case types.LOGOUT_SUCCESS:
      return { user: payload.user, token: null }
    case types.LOGOUT_FAILED:
      return { error: payload.error }
    case types.CREATE_USER_SUCCESS:
      return { user: payload.user }
    case types.CREATE_USER_FAILED:
      return { error: payload.error }
    default:
      return state
  }
}
 

// COMBINED REDUCERS
const reducers = {
  // facebook: facebookReducer,
  user: userReducer
}

export default combineReducers(reducers)
