import { connect } from 'react-redux'
import App from '../../components/app/App'
import { Action } from 'redux'
import { AppState } from '../../store'
import { ThunkAction } from 'redux-thunk'
import { setUser } from '../../actions/auth'

interface LinkStateToProps {
  user: {
    userId: string
    username: string
  } | null
  loading: boolean
}

interface LinkDispatchToProps {
  setUser: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  setUser,
}

// TODO: fix typechecking error
export default connect(mapStateToProps, mapDispatchToProps)(App as any)
