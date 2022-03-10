import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './styles.css'
import Counter from './Counter'
// import { getUser } from './redux/ducks/user'
import { getUser } from './redux/ducks/userSlice'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser({ id: 1 }))
  }, [dispatch])

  const user = useSelector((state) => state.user.data)

  const count = useSelector((state) => state.counter.count)
  const voters = ['Anthony Sistilli ', 'Bob Smith', 'Stephanie Foo', 'Kevin Ma']

  return (
    <div className="App">
      <h3>Hello, {user?.firstName}</h3>
      <h1>Redux made easy</h1>
      <h2> Total Votes: {count}</h2>
      {voters.map((voter) => (
        <Counter name={voter} key={voter} />
      ))}
    </div>
  )
}
