import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { authReducer } from './store/auth/reducer'
import { userReducer } from './store/user/reducer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const store = createStore(
  combineReducers({ auth: authReducer, user: userReducer }),
  applyMiddleware(thunk),
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
