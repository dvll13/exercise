import { useState } from 'react'

const GuestList: React.FC = () => {
  const [name, setName] = useState('')
  // const [guests, setGuests] = useState([]) // TS assumes that the array will be forever empty -> guests: never[]
  const [guests, setGuests] = useState<string[]>([]) // now all is good

  const addGuestHandler = (): void => {
    setName('')
    setGuests([...guests, name])
  }

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((guest) => (
          <li key={guest}>{guest}</li>
        ))}
      </ul>

      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button onClick={addGuestHandler}>Add guest</button>
    </div>
  )
}

export default GuestList
