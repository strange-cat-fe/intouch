import { connect, ConnectedProps } from 'react-redux'
import Login from '../../../components/auth/login/Login'
import { SetErrorAction, DeleteSuccessMessageAction } from '../../../types/auth'
import { AppState } from '../../../store'
import {
  updateLoginForm,
  login,
  setError,
  deleteSuccessMessage,
} from '../../../actions/auth'
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
  }) => ThunkAction<void, AppState, unknown, Action<string>>
  login: () => ThunkAction<void, AppState, unknown, Action<string>>
  setError: (error: string | null) => SetErrorAction
  deleteSuccessMessage: () => DeleteSuccessMessageAction
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
  setError,
  deleteSuccessMessage,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type LoginProps = ConnectedProps<typeof connector>

export default connector(Login)
