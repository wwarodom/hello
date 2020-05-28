import Layout from '../components/Layout'
import { useSelector } from 'react-redux'

export default () => {
  const user = useSelector(state => state.facebook.user) 

  return (
    <Layout menuId='3' user={user} >
      <div className='topBox'>
        <div className='mediumBox'>
          About  
        </div>
      </div>
    </Layout>
  )
}
  