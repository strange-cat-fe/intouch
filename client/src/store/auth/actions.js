import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  UPDATE_SIGN_UP_FORM,
  SIGN_UP,
  HIDE_SUCCESS_MESSAGE,
  UPDATE_LOG_IN_FORM,
  LOG_IN,
} from './types'
import { setUser } from '../user/actions'

export const showLoader = () => ({ type: SHOW_LOADER })

export const hideLoader = () => ({ type: HIDE_LOADER })

export const showAlert = message => ({ type: SHOW_ALERT, payload: message })

export const hideAlert = () => ({ type: HIDE_ALERT })

export const updateSignUpForm = form => {
  let valid

  if (
    form.email.trim().length >= 1 &&
    form.username.trim().length >= 4 &&
    form.password.trim().length >= 8
  ) {
    valid = true
  } else {
    valid = false
  }

  return {
    type: UPDATE_SIGN_UP_FORM,
    payload: { ...form, valid },
  }
}

export const signUp = form => {
  return async dispatch => {
    dispatch(hideAlert())
    dispatch(showLoader())

    const response = await fetch('http://192.168.1.202:5000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        username: form.username,
        password: form.password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.error) {
      dispatch(updateSignUpForm({ ...form, password: '' }))
      dispatch(showAlert(result.data))
      dispatch(hideLoader())
    } else {
      dispatch({
        type: SIGN_UP,
        payload: result.data,
      })
      dispatch(hideLoader())
    }
  }
}

export const updateLogInForm = form => {
  let valid

  if (form.email.trim().length >= 1 && form.password.trim().length >= 8) {
    valid = true
  } else {
    valid = false
  }

  return {
    type: UPDATE_LOG_IN_FORM,
    payload: { ...form, valid },
  }
}

export const logIn = form => {
  return async dispatch => {
    dispatch(hideAlert())
    dispatch(showLoader())

    const response = await fetch('http://192.168.1.202:5000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.error) {
      dispatch(updateLogInForm({ ...form, password: '' }))
      dispatch(showAlert(result.data))
      dispatch(hideLoader())
    } else {
      localStorage.setItem('User', JSON.stringify(result.data))

      dispatch(setUser())

      dispatch({
        type: LOG_IN,
      })

      dispatch(hideLoader())
    }
  }
}

export const hideSuccessMessage = () => ({ type: HIDE_SUCCESS_MESSAGE })
