import React, { useEffect } from 'react'
import classes from './SignUp.module.css'
import logo from '../../../logo.png'
import {
  FormControl,
  Input,
  FormHelperText,
  Button,
  SimpleGrid,
  Spinner,
  Link,
  useToast,
} from '@chakra-ui/core'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { SignUpProps } from '../../../containers/auth/signup/SignUpContainer'

const SignUp: React.FC<SignUpProps & RouteComponentProps> = ({
  form,
  loading,
  error,
  updateSignUpForm,
  signUp,
  setError,
  history,
}) => {
  const toast = useToast()

  useEffect((): any => {
    error &&
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        onClose: () => setError(null),
      })

    return () => setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  if (loading) {
    return (
      <div className={classes.loader}>
        <Spinner
          color="blue.400"
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          size="xl"
        />
      </div>
    )
  }
  return (
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
}
export default withRouter(SignUp)
