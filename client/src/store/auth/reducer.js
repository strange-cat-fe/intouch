import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SIGN_UP,
  HIDE_SUCCESS_MESSAGE,
  UPDATE_SIGN_UP_FORM,
  UPDATE_LOG_IN_FORM,
  LOG_IN,
} from './types'

const initialState = {
  signUp: {
    email: '',
    username: '',
    password: '',
    valid: false,
  },
  logIn: {
    email: '',
    password: '',
    valid: false,
  },
  success: null,
  error: null,
  loading: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case SHOW_ALERT:
      return { ...state, error: action.payload }
    case HIDE_ALERT:
      return { ...state, error: null }
    case UPDATE_SIGN_UP_FORM:
      return { ...state, signUp: action.payload }
    case SIGN_UP:
      return { ...state, success: action.payload }
    case HIDE_SUCCESS_MESSAGE:
      return { ...state, success: false }
    case UPDATE_LOG_IN_FORM:
      return { ...state, logIn: action.payload }
    case LOG_IN:
      return { ...state }
    default:
      return state
  }
}
