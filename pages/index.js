import Layout from '../components/Layout' 
import { useSelector } from 'react-redux'
import withAuth from '../hoc/auth' 

function Home (props) {
  let user = useSelector(state => state.user.user) 
  user = user || props.user
  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'> Home</div> 
    </Layout>
  )
} 

export default withAuth(Home)
