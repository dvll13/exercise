import { useCallback, useEffect, useRef, useState } from 'react'
import QUESTIONS from '../questions'
import Question from './Question'
import Summary from './Summary'

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  // const [points, setPoints] = useState(0)

  const activeQuestionIdx = userAnswers.length
  const activeQuestion = QUESTIONS[activeQuestionIdx]

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer])

    // if (answer === correctAnswer) {
    //   setPoints((prevPoints) => ++prevPoints)
    // }
  }, [])

  const handleSkipAnswer = useCallback(
    function handleSkipAnswer() {
      handleSelectAnswer(null)
    },
    [handleSelectAnswer],
  )

  function handleRetry() {
    setUserAnswers([])
    setPoints(0)
  }

  if (!activeQuestion) {
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx} // added to make the component re-render and reset timer and interval on new question
        index={activeQuestionIdx}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}

export default Quiz
