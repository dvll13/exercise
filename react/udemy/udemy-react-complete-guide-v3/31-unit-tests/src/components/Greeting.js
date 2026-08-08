import { useState } from 'react'
import Output from './Output'

export default function Greeting() {
  const [changedText, setChangedText] = useState(false)

  const handleChangeText = () => {
    setChangedText(true)
  }

  return (
    <div>
      <h2>Hello World!</h2>
      {!changedText && <Output>Enjoy your stay!</Output>}
      {changedText && <Output>Changed!</Output>}
      <button onClick={handleChangeText}>Change text</button>
    </div>
  )
}
