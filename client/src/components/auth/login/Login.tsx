import React, { useEffect, FormEvent, useState } from 'react'
import classes from './Login.module.css'
import logo from '../../../logo.png'
import {
  Spinner,
  SimpleGrid,
  FormControl,
  Input,
  Button,
  Link,
  useToast,
} from '@chakra-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { LoginProps } from '../../../containers/auth/login/LoginContainer'

const Login: React.FC<LoginProps & RouteComponentProps> = ({
  form,
  error,
  loading,
  success,
  updateLoginForm,
  login,
  setError,
  deleteSuccessMessage,
  history,
}) => {
  const toast = useToast()
  const [width, setWidth] = useState(0)

  const updateWidth = () => setWidth(window.innerWidth)

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)

    error &&
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        onClose: () => setError(null),
      })

    success &&
      toast({
        title: 'Account created',
        description: success,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    return () => {
      window.removeEventListener('resize', updateWidth)
      setError(null)
      deleteSuccessMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success])

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

  if (width <= 768) {
    return (
      <form
        className={classes.form}
        onChange={(e: FormEvent<HTMLFormElement>) =>
          updateLoginForm({
            ...form,
            [(e.target as HTMLFormElement).name]: (e.target as HTMLInputElement)
              .value,
          })
        }
        onSubmit={e => {
          e.preventDefault()
          login()
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
              setError(null)
              deleteSuccessMessage()
              history.push('/auth/signup')
            }}
          >
            Sign Up
          </Link>
        </SimpleGrid>
      </form>
    )
  }

  return (
    <form
      className={classes.form}
      onChange={(e: FormEvent<HTMLFormElement>) =>
        updateLoginForm({
          ...form,
          [(e.target as HTMLFormElement).name]: (e.target as HTMLInputElement)
            .value,
        })
      }
      onSubmit={e => {
        e.preventDefault()
        login()
      }}
    >
      <SimpleGrid columns={1} spacing="1rem" width="320px" margin="0 auto">
        <img className={classes.img} src={logo} alt="InTouch Logo" />
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
            setError(null)
            deleteSuccessMessage()
            history.push('/auth/signup')
          }}
        >
          Sign Up
        </Link>
      </SimpleGrid>
    </form>
  )
}
export default withRouter(Login)
