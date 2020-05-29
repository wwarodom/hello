import Layout from '../components/Layout'
import { useSelector } from 'react-redux'

export default () => {
  const user = useSelector(state => state.user.user) 

  return (
    <Layout menuId='3' user={user} >
      <div className='topBox'> 
          About   
      </div>
    </Layout>
  )
}
  