import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUpContainer from '../../containers/auth/signup/SignUpContainer'
import LoginContainer from '../../containers/auth/login/LoginContainer'
import FeedContainer from '../../containers/feed/FeedContainer'
import NewPostContainer from '../../containers/new-post/NewPostContainer'
import ProfileContainer from '../../containers/profile/ProfileContainer'
import { AppProps } from '../../containers/app/AppContainer'
import SettingsContainer from '../../containers/settings/SettingsContainer'
import ChangeAvatar from '../profile/changeAvatar/ChangeAvatar'

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
        <Route path="/settings" exact component={SettingsContainer} />
        <Route path="/settings/avatar" component={ChangeAvatar} />
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
