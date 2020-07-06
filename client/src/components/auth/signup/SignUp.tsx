import React from 'react'
import classes from './SignUp.module.css'
import logo from '../../../logo.png'
import {
  FormControl,
  Input,
  FormHelperText,
  Button,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/core'
import { SetErrorAction } from '../../../types/auth'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../../store'
import { Action } from 'redux'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

interface SignUpProps extends RouteComponentProps {
  form: {
    email: string
    username: string
    password: string
    valid: boolean
    success: string | null
  }
  loading: boolean
  error: string | null
  updateSignUpForm: (form: {
    email: string
    username: string
    password: string
    valid: boolean
  }) => ThunkAction<void, AppState, unknown, Action<string>>
  signUp: () => ThunkAction<void, AppState, unknown, Action<string>>
  setError: (error: string | null) => SetErrorAction
}

const SignUp: React.FC<SignUpProps> = ({
  form,
  loading,
  error,
  updateSignUpForm,
  signUp,
  setError,
  history,
}) =>
  loading ? (
    <div className={classes.loader}>
      <Spinner
        color="blue.400"
        thickness="4px"
        speed="0.5s"
        emptyColor="gray.200"
        size="xl"
      />
    </div>
  ) : (
    <form
      className={classes.form}
      onChange={e =>
        updateSignUpForm({
          ...form,
          [(e.target as any).name]: (e.target as any).value,
        })
      }
      onSubmit={e => {
        e.preventDefault()
        signUp()
      }}
    >
      <SimpleGrid columns={1} spacing="1rem">
        <img className={classes.img} src={logo} alt="InTouch Logo" />
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormControl>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={form.email}
            aria-describedby="email-helper-text"
            focusBorderColor="blue.400"
          />
          <FormHelperText id="email-helper-text">
            Make sure to provie real E-mail
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={form.username}
            aria-describedby="username-helper-text"
            focusBorderColor="blue.400"
          />
          <FormHelperText id="username-helper-text">
            At least 4 characters
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            defaultValue={form.password}
            aria-describedby="password-helper-text"
            focusBorderColor="blue.400"
          />
          <FormHelperText id="password-helper-text">
            Combination of 8 characters
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variantColor="blue"
          variant="solid"
          isDisabled={!form.valid}
        >
          Sign Up
        </Button>
        <Link
          className={classes.link}
          onClick={(e: React.FormEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setError(null)
            history.push('/auth/login')
          }}
        >
          Already have an account?
        </Link>
      </SimpleGrid>
      {form.success && <Redirect to="/auth/login" />}
    </form>
  )

export default withRouter(SignUp)
