import Layout from '../components/Layout'
// import firebase from '../config/firebase'
// import { getCookie } from '../utils/cookie'
import { useSelector, useDispatch } from 'react-redux'
import withAuth from '../hoc/auth'

function Home (props) {
  let user = useSelector(state => state.user.user)
  // console.log('user: ', user)
  // console.log('props.user: ', props.user)
  user = user || props.user
  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'> Home</div>
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
