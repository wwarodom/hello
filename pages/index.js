import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import withAuth from '../hoc/auth'
import { Card, Input, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { firestore } from '../config/firebase'

function Home (props) {
  let user = useSelector(state => state.user.user)
  user = user || props.user

  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')

  const retriveData = () => {
    firestore
      .collection('tasks')
      .orderBy('id', 'asc')
      .onSnapshot(snapshot => {
        let myTask = snapshot.docs.map(d => {
          const { id, name } = d.data()
          return { id, name }
        })
        setTasks(myTask)
        console.log(myTask)
      })
  }

  const renderCard = () => {
    if (tasks.length === 0) return <div>loading....</div>
    return tasks.map((task, index) => {
      return (
        <Card className='card' key={index}>
          <div className='number-top'>id: {task.id} </div>
          <p>{task.name}</p>
          <p className='number-bottom'>
            <DeleteOutlined onClick={() => removeTask(task.id)} />
          </p>
        </Card>
      )
    })
  }

  const addNewTask = async value => {
    let id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1
    firestore
      .collection('tasks')
      .doc(id + '')
      .set({ id, name })
  }

  const addNewForm = () => {
    return (
      <div>
        <div
          style={{ display: 'flex', marginBottom: '16px', maxWidth: '300px' }}
        >
          <Input
            placeholder='task'
            width='10'
            onChange={e => setName(e.target.value)}
          />
          <Button type='primary' onClick={addNewTask}>
            Add
          </Button>
        </div>
      </div>
    )
  }

  const removeTask = id => {
    firestore
      .collection('tasks')
      .doc(id + '')
      .delete()
  }

  useEffect(() => {
    retriveData()
  }, [])

  return (
    <Layout menuId='1' user={user}>
      <div style={{ minHeight: '700px' }}>
        <div>
          <h1>Todo</h1>
        </div>
        <div>{addNewForm()}</div>
        <div className='todo'>{renderCard()}</div>
      </div>
    </Layout>
  )
}

export default withAuth(Home)
