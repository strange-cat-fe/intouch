import {
  SetLoadingAction,
  SetErrorAction,
  DeleteSuccessMessageAction,
} from '../types/auth'
import {
  UPDATE_SIGNUP_FORM,
  SET_LOADING,
  SIGNUP,
  SET_ERROR,
  UPDATE_LOGIN_FORM,
  SET_USER,
  LOGIN,
  DELETE_SUCCESS_MESSAGE,
  LOG_OUT,
} from '../constants/auth'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { Action } from 'redux'
import jwt_decode from 'jwt-decode'

export const updateSignUpForm = (form: {
  email: string
  username: string
  password: string
}): ThunkAction<void, AppState, unknown, Action<string>> => (
  dispatch,
  getState,
) => {
  getState().auth.error && dispatch(setError(null))

  dispatch({
    type: UPDATE_SIGNUP_FORM,
    payload: {
      ...form,
      valid:
        form.email.length > 0 &&
        form.username.length > 3 &&
        form.password.length > 7,
      success: null,
    },
  })
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

  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  if (result.error) {
    dispatch(
      updateSignUpForm({
        ...getState().auth.signup,
        password: '',
      }),
    )
    dispatch(setError(result.data))
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
}): ThunkAction<void, AppState, unknown, Action<string>> => (
  dispatch,
  getState,
) => {
  getState().auth.error && dispatch(setError(null))
  getState().auth.signup.success && dispatch(deleteSuccessMessage())

  dispatch({
    type: UPDATE_LOGIN_FORM,
    payload: {
      ...form,
      valid: form.email.length > 0 && form.password.length > 7,
    },
  })
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

  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  if (result.error) {
    dispatch(
      updateLoginForm({
        ...getState().auth.login,
        password: '',
      }),
    )
    dispatch(setError(result.data))
    dispatch(setLoading(false))
  } else {
    dispatch(
      updateLoginForm({
        email: '',
        password: '',
      }),
    )
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    document.cookie = `refreshToken=${result.data};expires=${date};samesite=strict;path=/;`
    dispatch({
      type: LOGIN,
    })
    dispatch(setUser())
    dispatch(setLoading(false))
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
    const response = await fetch('http://localhost:5000/api/auth/accessToken', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: unescape(refreshToken![2]) }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()

    if (result.error) {
      dispatch({
        type: SET_USER,
        payload: null,
      })
      dispatch(setLoading(false))
    } else {
      const date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * -1)
      document.cookie = 'refreshToken=;expires=' + date + 'path=/'

      const newDate = new Date()
      newDate.setMonth(newDate.getMonth() + 1)
      document.cookie = `refreshToken=${result.data.refreshToken};expires=${newDate};samesite=strict;path=/;`

      sessionStorage.setItem(
        'accessToken',
        JSON.stringify(result.data.accessToken),
      )

      dispatch({
        type: SET_USER,
        payload: jwt_decode(result.data.accessToken),
      })

      dispatch(setLoading(false))
    }
  } else {
    dispatch({
      type: SET_USER,
      payload: null,
    })
    dispatch(setLoading(false))
  }
}

export const deleteSuccessMessage = (): DeleteSuccessMessageAction => {
  return {
    type: DELETE_SUCCESS_MESSAGE,
  }
}

export const logOut = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => dispatch => {
  dispatch(setLoading(true))

  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * -1)
  document.cookie = 'refreshToken=;expires=' + date + 'path=/'

  sessionStorage.clear()

  dispatch({
    type: LOG_OUT,
  })

  dispatch(setLoading(false))
}
