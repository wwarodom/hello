import * as types from './types'
import firebase from '../config/firebase' 
import Router from 'next/router'

export const loginFacebook = () => async dispatch => {
  let provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      let token = result.credential.accessToken
      var user = result.user
      console.log('token:  ', token)
      console.log('user displayName: ', user.displayName)
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: user.displayName, token }
      })
      Router.push('/')
    })
    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      var email = error.email
      var credential = error.credential
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
    })
}

export const logoutFacebook = () => async dispatch => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log('Signout already')
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: { user: null }
      })
      Router.push('/login')
    })
    .catch(function (error) {
      console.log('error occurred')
      dispatch({
        type: types.LOGOUT_FAILED,
        payload: { error: error.message }
      })
    })
}

export const createUserAndSignIn = (email, password) => async dispatch => {
  console.log('email', email)
  console.log('password', password)
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.log('error: ', error.message)
      dispatch({
        type: types.CREATE_USER_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
      return ;
    })
    dispatch({
      type: types.CREATE_USER_SUCCESS,
      payload: { user: email }
    })
    console.log('register success ', email)
    Router.push('/')
}

export const loginEmail = (email, password) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) { 
      var errorCode = error.code
      var errorMessage = error.message
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
      return ;
    })
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: { user: email, token: 'emailtoken'+email }
    })
    Router.push('/')
}
