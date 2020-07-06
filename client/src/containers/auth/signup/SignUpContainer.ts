import { connect } from 'react-redux'
import SignUp from '../../../components/auth/signup/SignUp'
import { updateSignUpForm, signUp } from '../../../actions/auth'
import { UpdateSignUpFormAction } from '../../../types/auth'
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
  }) => UpdateSignUpFormAction
  signUp: () => ThunkAction<void, AppState, unknown, Action<string>>
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
}

// TODO: fix typechecking error
export default connect(mapStateToProps, mapDispatchToProps)(SignUp as any)