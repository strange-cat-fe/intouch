import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUpContainer from '../../containers/auth/signup/SignUpContainer'
import LoginContainer from '../../containers/auth/login/LoginContainer'

const App: React.FC = () => (
  <Router>
    <Route path="/auth/signup" component={SignUpContainer} />
    <Route path="/auth/login" component={LoginContainer} />
    <Redirect to="/auth/login" />
  </Router>
)

export default App
