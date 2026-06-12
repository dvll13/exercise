import { useDispatch, useSelector } from 'react-redux'
import classes from './Counter.module.css'
import { decrement, increment, incrementByAmount, toggle } from '../store/counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)
  const showCounter = useSelector((state) => state.counter.showCounter)
  const dispatch = useDispatch()

  const decrementHandler = () => {
    dispatch(decrement())
  }

  const incrementHandler = () => {
    dispatch(increment())
  }

  const increaseBy5Handler = () => {
    dispatch(incrementByAmount(5))
  }

  const toggleCounterHandler = () => {
    dispatch(toggle())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseBy5Handler}>Increase by 5</button>
        <button onClick={incrementHandler}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      {showCounter && <div className={classes.value}>{count}</div>}
    </main>
  )
}

export default Counter
