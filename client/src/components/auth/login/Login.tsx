import React from 'react'
import classes from './Login.module.css'
import logo from '../../../logo.png'
import {
  Spinner,
  SimpleGrid,
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Button,
  Link,
} from '@chakra-ui/core'
import { UpdateLoginFormAction } from '../../../types/auth'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../../store'
import { Action } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface LoginProps extends RouteComponentProps {
  form: {
    email: string
    password: string
    valid: boolean
  }
  success: string | null
  error: string | null
  loading: boolean
  updateLoginForm: (form: {
    email: string
    password: string
  }) => UpdateLoginFormAction
  login: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const Login: React.FC<LoginProps> = ({
  form,
  error,
  loading,
  success,
  updateLoginForm,
  login,
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
        updateLoginForm({
          ...form,
          [(e.target as any).name]: (e.target as any).value,
        })
      }
      onSubmit={e => {
        e.preventDefault()
        login()
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
        {success && (
          <Alert status="success">
            <AlertIcon />
            {success}
          </Alert>
        )}
        <FormControl>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={form.email}
            focusBorderColor="blue.400"
          />
        </FormControl>
        <FormControl>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            defaultValue={form.password}
            focusBorderColor="blue.400"
          />
        </FormControl>
        <Button
          type="submit"
          variantColor="blue"
          variant="solid"
          isDisabled={!form.valid}
        >
          Log In
        </Button>
        <Link
          className={classes.link}
          onClick={(e: React.FormEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            history.push('/auth/signup')
          }}
        >
          Sign Up
        </Link>
      </SimpleGrid>
    </form>
  )

export default withRouter(Login)
