import { useState } from 'react'
import Result from './components/Result'
import UserInput from './components/UserInput'
import Header from './components/Header'

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  const inputIsValid = userInput.duration >= 1

  const handleChange = (inputIdentifier, newValue) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      // [inputIdentifier]: Number(newValue),
      [inputIdentifier]: +newValue,
    }))
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && <p className="center">Please enter duration &gt;0</p>}
      {inputIsValid && <Result userInput={userInput} />}
    </>
  )
}

export default App
