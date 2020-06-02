import Layout from '../components/Layout'
import firebase from '../config/firebase'
// import { getCookie } from '../utils/cookie'
import { useSelector, useDispatch } from 'react-redux'
import withAuth from '../hoc/auth'
import {Button } from 'antd'

function Home (props) {
  let user = useSelector(state => state.user.user)
  // console.log('user: ', user)
  // console.log('props.user: ', props.user)

  const getToken = () => {
    console.log('get Token')
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user at index: ', user.displayName)
        console.log('user at index: ', user)
      } else {
        // No user is signed in.
      }
    });
  }

  user = user || props.user
  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'> Home</div>
      <Button onClick={getToken}>Get Token </Button>
    </Layout>
  )
}

// export async function getServerSideProps (ctx) {
//   let user = getCookie('user', ctx.req)
//   console.log('user from cookie: ', user)
//   user = user || ''
//   return { props: { user } }
// }

export default withAuth(Home)
