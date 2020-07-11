import { connect, ConnectedProps } from 'react-redux'
import SignUp from '../../../components/auth/signup/SignUp'
import { updateSignUpForm, signUp, setError } from '../../../actions/auth'
import { SetErrorAction } from '../../../types/auth'
import { AppState } from '../../../store'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

interface LinkStateToProps {
  form: {
    email: string
    username: string
    password: string
    valid: boolean
    success: string | null
  }
  loading: boolean
  error: string | null
}

interface LinkDispatchToProps {
  updateSignUpForm: (form: {
    email: string
    username: string
    password: string
    valid: boolean
  }) => ThunkAction<void, AppState, unknown, Action<string>>
  signUp: () => ThunkAction<void, AppState, unknown, Action<string>>
  setError: (error: string | null) => SetErrorAction
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    form: state.auth.signup,
    loading: state.auth.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  updateSignUpForm,
  signUp,
  setError,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type SignUpProps = ConnectedProps<typeof connector>

export default connector(SignUp)
