import Layout from '../components/Layout' 
import { useSelector } from 'react-redux'
import withAuth from '../hoc/auth' 

const Contact = (props) => {
  let user = useSelector(state => state.user.user) 
  user = user || props.user

  return (
    <Layout menuId='2' user={user}>
      <div className='topBox'>
         Contact 
      </div>
    </Layout>
  )
}

export default withAuth(Contact)
