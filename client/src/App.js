import React from 'react'
import SignUpPage from './components/auth/SignUpPage'
import LogInPage from './components/auth/LogInPage'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path="/auth/login" component={LogInPage} />
      <Route path="/auth/signup" component={SignUpPage} />
      <Redirect from="/" to="/auth/login" />
    </BrowserRouter>
  )
}

export default App
