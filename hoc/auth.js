import {getCookie} from '../utils/cookie'

export default (Component) => {

  const withAuth = props => { 
    const user = getCookie('user', null) 
    return <Component {...props} user={user} />
  }

  return withAuth
}
