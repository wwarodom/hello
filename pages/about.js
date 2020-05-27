import Layout from '../components/Layout'  

export default () => {
 
  return (
    <Layout menuId="3">  
      <div className='topBox'>
        <div className='mediumBox'>About</div>
      </div>
    </Layout>
  )
}
 

export async function getServerSideProps() {
  let token=null
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
    console.log('get token about', token)
  }

  return {
    props: {
      token,
    },
  }
}