import {
  UPDATE_SIGNUP_FORM,
  SET_LOADING,
  SIGNUP,
  SET_ERROR,
  UPDATE_LOGIN_FORM,
  LOGIN,
  SET_USER,
  DELETE_SUCCESS_MESSAGE,
} from '../constants/auth'
import { Post } from './feed'

export interface AuthState {
  signup: {
    email: string
    username: string
    password: string
    valid: boolean
    success: string | null
  }
  login: {
    email: string
    password: string
    valid: boolean
  }
  error: string | null
  loading: boolean
  user: null | { username: string; userId: string }
}

export interface UpdateSignUpFormAction {
  type: typeof UPDATE_SIGNUP_FORM
  payload: {
    email: string
    username: string
    password: string
    valid: boolean
    success: null
  }
}

export interface UpdateLoginFormAction {
  type: typeof UPDATE_LOGIN_FORM
  payload: {
    email: string
    password: string
    valid: boolean
  }
}

export interface SetLoadingAction {
  type: typeof SET_LOADING
  payload: boolean
}

export interface DeleteSuccessMessageAction {
  type: typeof DELETE_SUCCESS_MESSAGE
}

export interface SetErrorAction {
  type: typeof SET_ERROR
  payload: string | null
}

export interface SignUpAction {
  type: typeof SIGNUP
  payload: string
}

export interface LoginAction {
  type: typeof LOGIN
}

export interface SetUserAction {
  type: typeof SET_USER
  payload: {
    username: string
    userId: string
  }
}

export type AuthActions =
  | UpdateSignUpFormAction
  | SetLoadingAction
  | SignUpAction
  | UpdateLoginFormAction
  | LoginAction
  | SetUserAction
  | DeleteSuccessMessageAction
