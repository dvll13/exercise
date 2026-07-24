import { useEffect, useState } from 'react'

const TIMER_UPDATE_INTERVAL = 100

export default function QuestionTimer({ timeout, onTimerEnd, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    console.log('ue1')
    const answerTimeout = setTimeout(onTimerEnd, timeout)

    return () => {
      clearTimeout(answerTimeout)
    }
  }, [])

  useEffect(() => {
    console.log('ue2')
    const interval = setInterval(() => {
      setRemainingTime((prevValue) => prevValue - TIMER_UPDATE_INTERVAL)
    }, TIMER_UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
}
