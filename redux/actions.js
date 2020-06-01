import * as types from './types'
import firebase from '../config/firebase'
import Router from 'next/router'
import { setCookie, removeCookie } from '../utils/cookie'

export const loginFacebook = () => async dispatch => {
  let provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      let token = result.credential.accessToken
      let user = result.user
      console.log('token:  ', token)
      console.log('user displayName: ', user.displayName)
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: user.displayName, token }
      })
      setCookie('user',user.displayName)
      Router.push('/')
    })
    .catch(function (error) {
      // var errorCode = error.code
      // var email = error.email
      // var credential = error.credential
      let errorMessage = error.message
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
    })
}

export const logout = () => async dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Signout already')
      dispatch({
        type: types.LOGOUT_SUCCESS,
        payload: { user: null }
      })
      removeCookie('user')
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
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // result.user.updateProfile({
      //   displayName: nickname
      // })
       dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: { user: email }
      })
      setCookie('user',email) 
      console.log('register success ', email)
      Router.push('/')
    })
    .catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code
      // let errorMessage = error.message
      console.log('error: ', error.message)
      dispatch({
        type: types.CREATE_USER_FAILED,
        payload: { error: error.message }
      })
      Router.push('/register')
      return
    })
}

export const loginEmail = (email, password) => async dispatch => {   
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: email, token: 'emailtoken' + email }
      })
      setCookie('user',email)
      Router.push('/')
    })
    .catch(function (error) {
      // var errorCode = error.code
      // var errorMessage = error.message
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
      return
    })
}
