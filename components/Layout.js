import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

function PageLayout (props) {
  const [menuId, setMenuId] = useState(props.menuId)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
 
  useEffect( () => {setLoading(true),[]})

  const LogoutMenu = props => (
    <SubMenu title={props.user} key='4' style={{ float: 'right' }} {...props}>
      <Menu.Item
        key='setting:1'
        onClick={() => dispatch(logout())}
        // onClick={()=> console.log('click logout')}
      >
       Logout 
      </Menu.Item>
    </SubMenu>    
  )
  
  const LoginMenu = props => (
    <Menu.Item key='4' style={{ float: 'right' }} {...props}>
      <Link href='/login'>
        <a>Login </a>
      </Link>
    </Menu.Item>  
  )

  return (
    <Layout>
      <Header>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' selectedKeys={[menuId]}>
          <Menu.Item key='1'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link href='/about'>
              <a>About </a>
            </Link>
          </Menu.Item>  
          { (props.user && loading ) ? <LogoutMenu user={props.user} /> : <LoginMenu />}
        </Menu>
      </Header>
      <Content style={{ marginTop: '50px', padding: '0 50px' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 </Footer>
    </Layout>
  )
}

export default PageLayout
