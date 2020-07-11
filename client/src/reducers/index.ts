import { combineReducers } from 'redux'
import auth from './auth'
import feed from './feed'
import profile from './profile'

export default combineReducers({ auth, feed, profile })
