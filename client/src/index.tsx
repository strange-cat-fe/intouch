import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
