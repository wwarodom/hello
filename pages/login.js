import Layout from '../components/Layout'
import Link from 'next/link' 
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import firebase from '../config/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { loginFacebook } from '../redux/actions'

export default () => {
  const dispatch = useDispatch()

  // const state = useSelector( s => s)
  const user = useSelector(state => state.facebook.user)
  // const token =  useSelector((state) => state.facebook.token)
  // const error = useSelector((state) => state.facebook.error)
  // console.log('state: ', state )
  // console.log('token: ', token )

  const NormalLoginForm = () => {
    const onFinish = values => {
      console.log('Received values of form: ', values)
    }

    return (
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            style={{ marginRight: '8px' }}
          >
            Log in
          </Button>
          Or 
          <Link href='/register'>
            <a> register now!</a>
          </Link>
        </Form.Item>
        <Form.Item>
          <a
            href='#'
            className='fb connect'
            onClick={() => dispatch(loginFacebook())}
          >
            Sign in with Facebook
          </a>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout menuId='4' user={user}>
      <div className='topBox'>
        <div className='mediumBox'>
          <NormalLoginForm />
        </div>
      </div>
    </Layout>
  )
}
