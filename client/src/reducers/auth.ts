import {
  AuthState,
  AuthActions,
  UpdateSignUpFormAction,
  SetLoadingAction,
  SignUpAction,
  SetErrorAction,
  UpdateLoginFormAction,
  SetUserAction,
} from '../types/auth'
import {
  UPDATE_SIGNUP_FORM,
  SET_LOADING,
  SIGNUP,
  SET_ERROR,
  UPDATE_LOGIN_FORM,
  LOGIN,
  SET_USER,
  DELETE_SUCCESS_MESSAGE,
  LOG_OUT,
} from '../constants/auth'

const iniitalState: AuthState = {
  signup: {
    email: '',
    username: '',
    password: '',
    valid: false,
    success: null,
  },
  login: {
    email: '',
    password: '',
    valid: false,
  },
  error: null,
  loading: false,
  user: null,
}

export default (state = iniitalState, action: AuthActions): AuthState => {
  switch (action.type) {
    case UPDATE_SIGNUP_FORM:
      return { ...state, signup: (action as UpdateSignUpFormAction).payload }
    case SET_LOADING:
      return { ...state, loading: (action as SetLoadingAction).payload }
    case SET_ERROR:
      return { ...state, error: (action as SetErrorAction).payload }
    case SIGNUP:
      return {
        ...state,
        signup: { ...state.signup, success: (action as SignUpAction).payload },
      }
    case UPDATE_LOGIN_FORM:
      return { ...state, login: (action as UpdateLoginFormAction).payload }
    case LOGIN:
      return state
    case SET_USER:
      return { ...state, user: (action as SetUserAction).payload }
    case DELETE_SUCCESS_MESSAGE:
      return { ...state, signup: { ...state.signup, success: null } }
    case LOG_OUT:
      return { ...state, user: null }
    default:
      return state
  }
}
