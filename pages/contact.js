import Layout from '../components/Layout' 
import { useSelector } from 'react-redux'

export default () => {

  const user = useSelector(state => state.user.user) 

  return (
    <Layout menuId='2' user={user}>
      <div className='topBox'>
         Contact 
      </div>
    </Layout>
  )
}
