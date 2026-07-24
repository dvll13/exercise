import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '../store/counter'
import classes from './Counter.module.css'

const Counter = () => {
  const dispatch = useDispatch()
  const { counter, showCounter } = useSelector((state) => state.counter) // the component gets subscribed to that part of the state

  const handleIncrement = () => {
    // dispatch({ type: 'INCREMENT' })
    dispatch(counterActions.increment())
  }

  const handleIncrease = () => {
    // dispatch({ type: 'INCREASE', amount: 5 })
    dispatch(counterActions.increase(10))
  }

  const handleDecrement = () => {
    // dispatch({ type: 'DECREMENT' })
    dispatch(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    // dispatch({ type: 'TOGGLE' })
    dispatch(counterActions.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value} style={{ visibility: showCounter ? 'hidden' : undefined }}>
        {counter}
      </div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrease}>Increase by 10</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter
