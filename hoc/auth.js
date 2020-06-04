import firebase from '../config/firebase'
import { useState, useEffect } from 'react'

export default Component => {
  const withAuth = props => { 
    const [user, setUser] = useState('')

    useEffect( () => {
        firebase.auth().onAuthStateChanged(u => setUser(u && u.displayName))
    }, [user])

    return <Component {...props} user={user} />
  }

  return withAuth
}
