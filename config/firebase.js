import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseConfig = {
  apiKey: process.env.apiKey, // read from next.config.js
  authDomain: 'todo-240311.firebaseapp.com',
  databaseURL: 'https://todo-240311.firebaseio.com',
  projectId: 'todo-240311',
  storageBucket: 'todo-240311.appspot.com',
  messagingSenderId: '345893489351',
  appId: '1:345893489351:web:13241f9016432b011d8ce2',
  measurementId: 'G-KSEG8N6NLT'
}

if (!firebase.apps.length) 
  firebase.initializeApp(firebaseConfig)
// console.log(firebase.app().name)
export default firebase
