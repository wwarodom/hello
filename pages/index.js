import Layout from '../components/Layout'
import { useSelector } from 'react-redux'

export default function Home () {
  const user = useSelector(state => state.facebook.user)

  return (
    <Layout menuId='1' user={user}>
      <div className='topBox'>
        <div className='mediumBox'>Home</div>
      </div>
    </Layout>
  )
}
