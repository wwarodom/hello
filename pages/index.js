import Layout from '../components/Layout' 
import firebase from '../config/firebase'
import {getCookie} from  '../utils/cookie'
import { useSelector, useDispatch } from 'react-redux'

function Home() {
  
  let user = useSelector(state => state.user.user)
  console.log('current user: ', firebase.auth().currentUser)

  // user =  user?getCookieFromBrowser('user'):user

  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'> Home</div>
    </Layout>
  )
}

export  async function getServerSideProps (ctx) { 
  const user = getCookie('user',ctx.req)
  console.log('user from cookie: ', user)
  return { props: { 'user':'wwarodom@xxx.com' } }
}

export default Home