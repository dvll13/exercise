import { useRef, useState } from 'react'
import ResultModal from './ResultModal'

export default function TimerChallenge({ title, targetTime }) {
  const modalRef = useRef()
  const intervalRef = useRef()

  const targetTimeInMs = targetTime * 1000

  const [timeRemaining, setTimeRemaining] = useState(targetTimeInMs)

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTimeInMs

  if (timeRemaining <= 0) {
    clearInterval(intervalRef.current)
    modalRef.current.open() // our custom open() exposed from the useImperativeHandle hook
  }

  const handleStart = () => {
    intervalRef.current = setInterval(() => setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10), 10)
  }

  const handleStop = () => {
    modalRef.current.open()
    clearInterval(intervalRef.current)
  }

  const handleReset = () => {
    setTimeRemaining(targetTimeInMs)
  }

  return (
    <>
      <ResultModal ref={modalRef} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>

        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>{timerIsActive ? 'Time is running' : 'Timer inactive'}</p>
      </section>
    </>
  )
}
