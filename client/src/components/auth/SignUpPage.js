import React from 'react'
import './SignUpPage.scss'
import logo from '../../img/logo.png'
import FormControl from '../core/form-control/FormControl'
import Container from '../core/container/Container'
import Button from '../core/button/Button'
import { connect } from 'react-redux'
import {
  updateSignUpForm,
  signUp,
  hideAlert,
} from '../../store/auth/actions.js'
import { NavLink, Redirect } from 'react-router-dom'
import Alert from '../core/alert/Alert'
import Loader from '../core/loader/Loader'

const SignUpPage = ({
  form,
  loading,
  error,
  success,
  history,
  updateSignUpForm,
  signUp,
  hideAlert,
  user,
}) => {
  if (loading) {
    return (
      <div className="sign-up__loading">
        <Loader />
      </div>
    )
  }
  return (
    <div className="sign-up">
      <Container width="sm">
        <div className="sign-up__heading">
          <h1 className="sign-up__heading__text">Welcome to InTouch</h1>
          <img
            className="sign-up__heading__img"
            src={logo}
            alt="InTouch Logo"
          />
        </div>
        <form
          className="sign-up__form"
          onChange={event =>
            updateSignUpForm({
              ...form,
              [event.target.name]: event.target.value.trim(),
            })
          }
          onSubmit={event => {
            event.preventDefault()
            signUp(form)
          }}
        >
          {error && <Alert type="error" message={error} />}
          <FormControl
            className="sign-up__form__input"
            type="email"
            placeholder="E-Mail"
            name="email"
            helper="Make sure to provide a real e-mail"
            value={form.email}
            required
          />
          <FormControl
            className="sign-up__form__input"
            type="text"
            placeholder="Username"
            name="username"
            helper="At least 4 characters"
            value={form.username}
            required
          />
          <FormControl
            className="sign-up__form__input"
            type="password"
            placeholder="Password"
            name="password"
            helper="Combination of 8 characters"
            value={form.password}
            required
          />
          <Button
            className="sign-up__form__btn"
            type="submit"
            disabled={!form.valid}
          >
            Sign Up
          </Button>
          <NavLink
            className="sign-up__form__link"
            to="/auth/login"
            onClick={event => {
              event.preventDefault()
              hideAlert()
              history.push('/auth/login')
            }}
          >
            Already have an account?
          </NavLink>
        </form>
      </Container>
      {success && <Redirect to="/auth/login" />}
      {user._id && <Redirect to="/feed" />}
    </div>
  )
}

const mapStateToProps = state => ({
  form: state.auth.signUp,
  loading: state.auth.loading,
  error: state.auth.error,
  success: state.auth.success,
  user: state.user,
})

const mapDispatchToProps = {
  updateSignUpForm,
  signUp,
  hideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
