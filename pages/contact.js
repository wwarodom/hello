import Layout from '../components/Layout' 
import { useSelector } from 'react-redux'

export default () => {

  const user = useSelector(state => state.facebook.user) 

  return (
    <Layout menuId='2' user={user}>
      <div className='topBox'>
        <div className='mediumBox'>Contact</div>
      </div>
    </Layout>
  )
}
