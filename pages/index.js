import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import withAuth from '../hoc/auth'
import {Card} from 'antd'

function Home (props) {
  let user = useSelector(state => state.user.user)
  user = user || props.user
  return (
    <Layout menuId='1' user={user}>
      <div>
        <div >
          <h1>Todo</h1>
        </div>
        <div>
          <Card >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(Home)
