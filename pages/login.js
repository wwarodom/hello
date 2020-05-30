import Layout from '../components/Layout'
import Link from 'next/link'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { loginFacebook, loginEmail } from '../redux/actions'

export default () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const error = useSelector(state => state.user.error)
  // const token =  useSelector((state) => state.userReducer.token)
  // const error = useSelector((state) => state.userReducer.error)
  // console.log('state: ', state )  // console.log('token: ', token )

  const NormalLoginForm = () => {
    const onFinish = values => {
      console.log('Received values of form: ', values)
      dispatch(loginEmail(values.username, values.password))
    }

    return (
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          {error ? <Alert message={error} type='error' /> : ''}
        </Form.Item>

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
        <div className='mediumBox w300'>
          <NormalLoginForm />
        </div>
      </div>
    </Layout>
  )
}
