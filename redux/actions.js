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
      // let token = result.credential.accessToken
      // console.log('token:  ', token)
      let user = result.user.displayName
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user }
      })
      setCookie('user', user)
      Router.push('/')
    })
    .catch(function (error) { 
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

export const createUserAndSignIn = (email,password, nickname) => async dispatch => {
  
  // ====  update phone in firebase account =====
  // firebase.auth().settings.appVerificationDisabledForTesting = true;
  // let appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  // firebase.auth().signInWithPhoneNumber(phone, appVerifier)
  //   .then(function (confirmationResult) {
  //     return confirmationResult.confirm("123456")
  //   }).catch(function (error) {
  //       console.log('error sms')
  //   });

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      // console.log('profile: ', nickname, phone)
      // result.user.updatePhoneNumber({
      //   phoneNumber: phone
      // })
      result.user.updateProfile({
        displayName: nickname, 
      })

      dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: { user: nickname }
      })
      setCookie('user', nickname)
      // console.log('register success ', email)
      Router.push('/')
    })
    .catch(function (error) {
      dispatch({
        type: types.CREATE_USER_FAILED,
        payload: { error: error.message }
      })
      Router.push('/register')
      return
    })
}

export const loginEmail = (email, password) => async dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const nickname = result.user.displayName
      // token: result.user.refreshToken
      console.log('result login: ', result)
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: nickname }
      })
      setCookie('user', nickname)
      Router.push('/')
    })
    .catch(function (error) {
      dispatch({
        type: types.LOGIN_FAILED,
        payload: { error: error.message }
      })
      Router.push('/login')
      return
    })
}
