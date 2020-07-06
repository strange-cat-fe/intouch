import {
  UpdateSignUpFormAction,
  SetLoadingAction,
  SetErrorAction,
  UpdateLoginFormAction,
} from '../types/auth'
import {
  UPDATE_SIGNUP_FORM,
  SET_LOADING,
  SIGNUP,
  SET_ERROR,
  UPDATE_LOGIN_FORM,
  SET_USER,
} from '../constants/auth'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { Action } from 'redux'
import jwt_decode from 'jwt-decode'

export const updateSignUpForm = (form: {
  email: string
  username: string
  password: string
}): UpdateSignUpFormAction => {
  return {
    type: UPDATE_SIGNUP_FORM,
    payload: {
      ...form,
      valid:
        form.email.length > 0 &&
        form.username.length > 3 &&
        form.password.length > 7,
      success: null,
    },
  }
}

export const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: SET_LOADING,
    payload: loading,
  }
}

export const setError = (error: string | null): SetErrorAction => {
  return {
    type: SET_ERROR,
    payload: error,
  }
}

export const signUp = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setError(null))
  dispatch(setLoading(true))

  const { email, username, password } = getState().auth.signup

  const response = await fetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  })
  const result = await response.json()

  if (result.error) {
    dispatch(setError(result.data))
    dispatch(
      updateSignUpForm({
        ...getState().auth.signup,
        password: '',
      }),
    )
    dispatch(setLoading(false))
  } else {
    dispatch(
      updateSignUpForm({
        email: '',
        username: '',
        password: '',
      }),
    )
    dispatch({
      type: SIGNUP,
      payload: result.data,
    })
    dispatch(setLoading(false))
  }
}

export const updateLoginForm = (form: {
  email: string
  password: string
}): UpdateLoginFormAction => {
  return {
    type: UPDATE_LOGIN_FORM,
    payload: {
      ...form,
      valid: form.email.length > 0 && form.password.length > 7,
    },
  }
}

export const login = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setLoading(true))
  dispatch(setError(null))

  const { email, password } = getState().auth.login

  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const result = await response.json()

  if (result.error) {
    dispatch(setError(result.data))
    dispatch(
      updateLoginForm({
        ...getState().auth.login,
        password: '',
      }),
    )
    dispatch(setLoading(false))
  } else {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    document.cookie = `refreshToken=${result.data};expires=${date};`
  }
}

export const setUser = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setLoading(true))

  const refreshToken = document.cookie.match('(^|;) ?refreshToken=([^;]*)(;|$)')

  if (refreshToken) {
    const response = await fetch('/auth/accessToken', {
      method: 'POST',
      body: unescape(refreshToken[2]),
    })
    const result = await response.json()

    dispatch({
      type: SET_USER,
      payload: jwt_decode(result.data),
    })

    dispatch(setLoading(false))
  } else {
    dispatch({
      type: SET_USER,
      payload: null,
    })
    dispatch(setLoading(false))
  }
}
