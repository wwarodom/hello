import { getCookie } from '../utils/cookie'
import firebase from '../config/firebase'
import { useState } from 'react'

export default Component => {
  const withAuth = props => {
    // let user = getCookie('user', null)
    const [user, setUser] = useState('')
    firebase.auth().onAuthStateChanged(u => setUser(u && u.displayName))
    return <Component {...props} user={user} />
  }

  return withAuth
}
