 
import Link from 'next/link' 
import { useState } from 'react'
import { Layout, Menu } from 'antd' 
import firebase from '../config/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { logoutFacebook } from '../redux/actions'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu;


export default function Home (props) {
  const [menuId, setMenuId] = useState(props.menuId) 
  
  // console.log('user props: ', props.user )
  // console.log('firebase in Layout: ', firebase)

  const dispatch = useDispatch()



  if (typeof window !== 'undefined') 
    console.log('get token from localStorage:  ', localStorage.getItem('token'))

  const LogoutMenu = (props) => (
    <SubMenu title={props.user} key='4' style={{ float: 'right' }} {...props} >
        <Menu.Item key="setting:1"
          onClick={ ()=> dispatch(logoutFacebook())}
          // onClick={()=> console.log('click logout')}
        >Logout</Menu.Item> 
    </SubMenu>
  )

  const LoginMenu = (props) => (
    <Menu.Item key='4' style={{ float: 'right' }} {...props} >
      <Link href='/login'>
        <a>Login </a>
      </Link>
    </Menu.Item>
  )  

  return (
    <Layout>
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          //   defaultSelectedKeys={menuId}
          selectedKeys={[menuId]} 
        >
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
              <a>About</a>
            </Link>
          </Menu.Item>

          {props.user? <LogoutMenu user={props.user}/>: <LoginMenu /> } 

        </Menu>
      </Header>
      <Content style={{ marginTop: '50px', padding: '0 50px' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 </Footer>
    </Layout>
  )
}
