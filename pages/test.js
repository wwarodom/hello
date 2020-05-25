import { connect } from 'react-redux'
import Link from 'next/link'
import { startClock, serverRenderClock } from '../redux/actions'
import Examples from '../components/examples'
import { useEffect } from 'react'

const Index = (props) => {
  useEffect(() => {
    Index.timer = props.startClock()
    return () => clearInterval(Index.timer)
  }, [])

  return (
    <>
      <Examples />
      <Link href='/redux'>
        <a>Click to see current Redux State</a>
      </Link>
    </>
  )
}

Index.getInitialProps = async ({ store, req }) => {
  store.dispatch(serverRenderClock(!!req))
  return {}
}

const mapDispatchToProps = {
  startClock
}

export default connect(null, mapDispatchToProps)(Index)
