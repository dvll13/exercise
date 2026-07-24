import { useState } from 'react'
import Result from './components/Result'
import UserInput from './components/UserInput'

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  const inputIsValid = userInput.duration >= 1

  const handleChange = (e) => {
    setUserInput((prevUserInput) => {
      const { id, value } = e.target
      return {
        ...prevUserInput,
        [id]: +value,
      }
    })
  }

  return (
    <>
      <UserInput data={userInput} onChange={handleChange} />
      {!inputIsValid && <p className="center">Please enter a duration greater than 0.</p>}
      {inputIsValid && <Result userInput={userInput} />}
    </>
  )
}

export default App
