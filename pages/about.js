import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import withAuth from '../hoc/auth' 

const About = (props) => {
  let user = useSelector(state => state.user.user) 
  user = user || props.user

  return (
    <Layout menuId='3' user={user} >
      <div className='topBox'> 
          About   
      </div>
    </Layout>
  )
}

export default withAuth(About)