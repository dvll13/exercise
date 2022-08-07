import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState(null)

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const userData = { name, email, password }
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signup</h2>

      <form action="">
        <div className="form-group">
          <label htmlFor="name" className="text-muted">
            Name
          </label>
          <input type="text" name="name" value={name} onChange={handleChange(setName)} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-muted">
            E-mail
          </label>
          <input type="email" name="email" value={email} onChange={handleChange(setEmail)} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-muted">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange(setPassword)}
            className="form-control"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-raised btn-primary mt-5">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
