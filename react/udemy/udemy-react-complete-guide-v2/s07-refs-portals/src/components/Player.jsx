import { useState, useRef } from 'react'

export default function Player() {
  const [playerName, setPlayerName] = useState('')

  const inputRef = useRef()

  const handleClick = () => {
    setPlayerName(inputRef.current.value)
  }

  return (
    <section id="player">
      {/* <h2>Welcome, {submitted ? playerName : 'unknown entity'}</h2> */}
      <h2>Welcome, {playerName || 'unknown entity'}</h2>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  )
}
