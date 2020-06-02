import {getCookie} from '../utils/cookie' 
import firebase from '../config/firebase'

export default (Component) => {

  const withAuth = props => { 
    let user = getCookie('user', null) 
    firebase.auth().onAuthStateChanged((userAuth) => 
        user = (userAuth && userAuth.displayName === user)?user:null
    )
    return <Component {...props} user={user} />
  }

  return withAuth
}
