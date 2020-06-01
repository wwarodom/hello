import Layout from '../components/Layout'
import { Form, Input, Button, Checkbox, Alert, Tooltip } from 'antd' 
import { QuestionCircleOutlined } from '@ant-design/icons'
import { createUserAndSignIn } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

export default () => {

  const error = useSelector(state => state.user.error)

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }

  const RegistrationForm = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const onFinish = values => {
      console.log('Received values of form: ', values)
      dispatch(createUserAndSignIn(values.email, values.nickname, values.password))
    }

    return (
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item {...tailFormItemLayout}>
          {error ? <Alert message={error} type='error' /> : ''}
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator (rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!'
                )
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='nickname'
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title='What do you want others to call you?'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: 'Please input your phone number!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement')
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout menuId='4'>
      <div className='topBox'>
        <div className='mediumBox w450'>
          <RegistrationForm />
        </div>
      </div>
    </Layout>
  )
}
