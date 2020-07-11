import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUpContainer from '../../containers/auth/signup/SignUpContainer'
import LoginContainer from '../../containers/auth/login/LoginContainer'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import FeedContainer from '../../containers/feed/FeedContainer'
import NewPostContainer from '../../containers/new-post/NewPostContainer'
import ProfileContainer from '../../containers/profile/ProfileContainer'

interface AppProps {
  user: {
    _id: string
    username: string
  } | null
  loading: boolean
  setUser: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const App: React.FC<AppProps> = ({ user, setUser }) => {
  useEffect(() => {
    setUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user) {
    return (
      <Router>
        <Route path="/feed" exact component={FeedContainer} />
        <Route path="/feed/new" component={NewPostContainer} />
        <Route path="/profile/:username?" component={ProfileContainer} />
        <Redirect to="/feed" />
      </Router>
    )
  } else {
    return (
      <Router>
        <Route path="/auth/signup" component={SignUpContainer} />
        <Route path="/auth/login" component={LoginContainer} />
        <Redirect to="/auth/login" />
      </Router>
    )
  }
}

export default App
