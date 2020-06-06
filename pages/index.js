import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import withAuth from '../hoc/auth'
import { Card } from 'antd'
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
    if (tasks.length === 0 )
       return <div>Hey</div>
    return tasks.map((task, index) => {
      return (
        <Card className='card' key={index}>
          <p> {task.name} </p>
        </Card>
      )
    })
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
        <div className='todo'>{renderCard()}</div>
      </div>
    </Layout>
  )
}

export default withAuth(Home)
