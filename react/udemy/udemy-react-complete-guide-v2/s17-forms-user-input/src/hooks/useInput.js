import { useState } from 'react'

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [didEdit, setDidEdit] = useState(false) // is field dirty

  const valueIsValid = validationFn(enteredValue)

  function handleInputChange(event) {
    const { value } = event.target
    setEnteredValue(value)
    // hide error if user starts typing again
    setDidEdit(false)
  }

  function handleInputBlur() {
    setDidEdit(true)
  }

  return { value: enteredValue, didEdit, hasError: didEdit && !valueIsValid, handleInputChange, handleInputBlur }
}
