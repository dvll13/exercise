import { redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function AuthenticationPage() {
  return <AuthForm />
}

export default AuthenticationPage

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response({ message: 'Unsupported mode' }, { status: 422 }) // invalid user input
  }

  const formData = await request.formData()
  const authData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  })

  if (response.status === 422 || response.status === 401) {
    return response // we can return responses, react router will auto extract the data from the response
  }

  if (!response.ok) {
    throw new Response({ message: 'Could not authenticate user' }, { status: 500 })
  }

  const resData = await response.json()
  const { token } = resData

  localStorage.setItem('token', token)
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + 1)
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/') // to starting page
}
