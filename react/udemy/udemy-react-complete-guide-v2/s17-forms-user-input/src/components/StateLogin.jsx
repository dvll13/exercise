import Input from './Input'
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation'
import useInput from '../hooks/useInput'

export default function StateLogin() {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [enteredPassword, setEnteredPassword] = useState('')

  // const [enteredValues, setEnteredValues] = useState({
  //   email: '',
  //   password: '',
  // })

  function handleSubmit(event) {
    event.preventDefault()

    // validate here... even if there's another validation e.g. on keystroke

    console.log('SUBMIT')
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value)
  // }
  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value)
  // }

  // function handleInputChange(identifier, event) {
  //   setEnteredValues((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: event.target.value,
  //   }))

  //   // hide error if user starts typing again
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: false,
  //   }))
  // }

  // validation

  // const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@')

  // is field dirty
  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false,
  // })

  // outsourcing validation logic
  // const emailIsInvalid = didEdit.email && isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email)
  // const passwordIsInvalid = didEdit.password && hasMinLength(enteredValues.password, 6)

  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }))
  // }

  const {
    value: emailValue,
    hasError: hasEmailError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value))
  const {
    value: passwordValue,
    hasError: hasPasswordError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput('', (value) => hasMinLength(value, 6))

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={hasEmailError && 'Please enter a valid email.'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={hasPasswordError && 'Please enter a valid password.'}
        />

        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={enteredValues.email}
            onChange={(e) => handleInputChange('email', e)}
            onBlur={() => handleInputBlur('email')}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email.</p>}</div>
        </div> */}

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(e) => handleInputChange('password', e)}
            onBlur={() => handleInputBlur('password')}
          />
        </div> */}
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
