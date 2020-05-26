import * as types from './types'
import firebase from '../config/firebase'

export const loginFacebook = () => (dispatch) => {
  let provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      let token = result.credential.accessToken
      var user = result.user
      console.log('token:  ', token)
      console.log('user: ', user)
      console.log('user displayName: ', user.displayName)

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: user.displayName },
      }) 
    })
    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      var email = error.email
      var credential = error.credential
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message },
      }) 
    })  
}

export const logoutFacebook = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(function () { 
      console.log('Signout already')
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: { user: null },
      }) 
    })
    .catch(function (error) { 
      console.log('error occurred')
      dispatch({
        type: types.LOGOUT_FAILED,
        payload: { error: error.message },
      }) 
    })
}




// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = (isServer) => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: !isServer, ts: Date.now() },
  })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET })