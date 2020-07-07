import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUpContainer from '../../containers/auth/signup/SignUpContainer'
import LoginContainer from '../../containers/auth/login/LoginContainer'
import Feed from '../feed/Feed'

const App: React.FC = () => (
  <Router>
    <Route path="/auth/signup" component={SignUpContainer} />
    <Route path="/auth/login" component={LoginContainer} />
    <Route path="/feed" component={Feed} />
    <Redirect to="/feed" />
  </Router>
)

export default App
