import React, { useState } from 'react'
import axios from 'axios'
import Loading from './components/Loading'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  /*useEffect(() => {
    axios
      .get('https://randomuser.me/api/', { params: { results: 5 } })
      .then((response) => {
        // success
        console.log(response.data.results)
      })
      .catch((error) => {
        // error
        console.log(error)
      })
      .then(() => {
        console.log('always executed')
      })
  }, [])*/

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://randomuser.me/api/', { params: { results: 5 } })
      setUsers([...users, ...response.data.results])
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUsers()
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Find users" />
      </form>

      {users.map(({ name, email, id }) => (
        <div key={id.value}>
          <p>{name.first}</p>
          <p>{email}</p>
          <hr />
        </div>
      ))}

      {loading && <Loading />}
    </div>
  )
}

export default App
