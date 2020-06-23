import React from 'react'
import logo from '../../img/logo.png'
import './LogInPage.scss'
import Container from '../core/container/Container'
import FormControl from '../core/form-control/FormControl'
import Button from '../core/button/Button'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  updateLogInForm,
  logIn,
  hideAlert,
  hideSuccessMessage,
} from '../../store/auth/actions'
import Alert from '../core/alert/Alert'
import Loader from '../core/loader/Loader'

const LogInPage = ({
  history,
  form,
  loading,
  error,
  success,
  updateLogInForm,
  hideAlert,
  hideSuccessMessage,
  logIn,
  user,
}) => {
  if (loading) {
    return (
      <div className="log-in__loading">
        <Loader />
      </div>
    )
  }

  return (
    <div className="log-in">
      <Container width="sm">
        <div className="log-in__heading">
          <img className="log-in__heading__img" src={logo} alt="InTouch Logo" />
        </div>
        <form
          className="log-in__form"
          onChange={event => {
            updateLogInForm({
              ...form,
              [event.target.name]: event.target.value.trim(),
            })
          }}
          onSubmit={event => {
            event.preventDefault()
            hideSuccessMessage()
            logIn(form)
          }}
        >
          {success && <Alert message={success} type="success" />}
          {error && <Alert message={error} type="error" />}
          <FormControl
            className="log-in__form__input"
            type="text"
            placeholder="E-mail"
            name="email"
            value={form.email}
            required
          />
          <FormControl
            className="log-in__form__input"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            required
          />
          <Button
            className="log-in__form__btn"
            type="submit"
            disabled={!form.valid}
          >
            Log In
          </Button>
          <NavLink
            className="log-in__form__link"
            to="/auth/signup"
            onClick={event => {
              event.preventDefault()
              hideAlert()
              hideSuccessMessage()
              history.push('/auth/signup')
            }}
          >
            Sign Up
          </NavLink>
        </form>
      </Container>
      {user._id && <Redirect to="/feed" />}
    </div>
  )
}

const mapStateToProps = state => ({
  form: state.auth.logIn,
  error: state.auth.error,
  loading: state.auth.loading,
  success: state.auth.success,
  user: state.user,
})

const mapDispatchToProps = {
  updateLogInForm,
  logIn,
  hideAlert,
  hideSuccessMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)
