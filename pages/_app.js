import '../styles.css'
import 'antd/dist/antd.css'
// import 'font-awesome/css/font-awesome.css'

import { Provider } from 'react-redux'
import withReduxStore from '../redux/with-redux-store'

// This default export is required in a new `pages/_app.js` file.
function MyApp ({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default withReduxStore(MyApp)