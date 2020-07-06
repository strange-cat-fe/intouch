import { connect } from 'react-redux'
import Login from '../../../components/auth/login/Login'
import { UpdateLoginFormAction } from '../../../types/auth'
import { AppState } from '../../../store'
import { updateLoginForm, login } from '../../../actions/auth'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

interface LinkStateToProps {
  form: {
    email: string
    password: string
    valid: boolean
  }
  loading: boolean
  error: string | null
  success: string | null
}

interface LinkDispatchToProps {
  updateLoginForm: (form: {
    email: string
    password: string
  }) => UpdateLoginFormAction
  login: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    form: state.auth.login,
    loading: state.auth.loading,
    error: state.auth.error,
    success: state.auth.signup.success,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  updateLoginForm,
  login,
}

// TODO: fix typecheking error
export default connect(mapStateToProps, mapDispatchToProps)(Login as any)
