import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByParam } from './redux/counterSlice'
import './styles.css'

export default function App() {
  const { count } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1> The count is: {count}</h1>
      <button onClick={() => dispatch(increment())}> increment </button>
      <button onClick={() => dispatch(decrement())}> decrement </button>
      <button onClick={() => dispatch(incrementByParam({ value: 5 }))}> increment by param </button>
    </div>
  )
}
