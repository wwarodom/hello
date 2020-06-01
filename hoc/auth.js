import { getCookie } from '../utils/cookie'
import {useEffect} from 'react'

export default (Component) => {

  const withAuth = props => {
    console.log('inside withAuth')
    return <Component {...props} />
  }

  // withThing.getInitialProps = async ctx => {
  //     return { thing: true };
  // };

   async function getServerSideProps (ctx) {
    let user = getCookie('user', ctx.req)
    console.log('user from cookie: ', user)
    user = user || ''
    return { props: { user } }
  }

  return withAuth
}
