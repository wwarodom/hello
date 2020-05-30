import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import firebase from '../config/firebase'

function Home() {
  const user = useSelector(state => state.user.user)
  console.log('current user: ', firebase.auth().currentUser)

  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'> Home</div>
    </Layout>
  )
}

export default Home