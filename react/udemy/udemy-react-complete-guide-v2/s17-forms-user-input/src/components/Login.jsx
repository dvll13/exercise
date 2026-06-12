import { useRef, useState } from 'react'

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false)
  // refs a good for read-only access to fields
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    console.log('SUBMIT', emailRef.current.value, passwordRef.current.value)

    // validate on form submit
    const [enteredEmail /*enteredPassword*/] = [emailRef.current.value, passwordRef.current.value]
    const emailIsValid = enteredEmail.includes('@')

    if (!emailIsValid) {
      setEmailIsInvalid(true)
      return
    }

    setEmailIsInvalid(false)

    console.log('Sending HTTP request...')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          <div className="control-error">{emailIsInvalid && <p>Enter a valid mail.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordRef} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/* <button type="button" className="button" onClick={handleSubmit}> */}
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  )
}
