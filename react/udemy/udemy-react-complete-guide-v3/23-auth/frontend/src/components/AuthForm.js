import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom'

import classes from './AuthForm.module.css'

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const authData = useActionData()
  // const { message, errors } = authData
  const navigation = useNavigation()

  const isLogin = searchParams.get('mode') === 'login'
  const isSubmitting = navigation.state === 'submitting'

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {authData && authData.errors && (
          <ul>
            {Object.values(authData.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {authData && authData.message && <p>{authData.message}</p>}

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Create new user' : 'Login'}</Link>
          <button disabled={isSubmitting}>Save</button>
        </div>
      </Form>
    </>
  )
}

export default AuthForm
