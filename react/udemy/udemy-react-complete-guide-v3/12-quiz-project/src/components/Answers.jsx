import { useRef } from 'react'

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef()

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5) //NB shuffle an array
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((a) => {
        let cssClass = ''
        const isSelected = a === selectedAnswer
        if (isSelected) {
          if (answerState === 'answered') {
            cssClass = 'selected'
          }
          if (answerState === 'correct' || answerState === 'wrong') {
            cssClass = answerState
          }
        }

        return (
          <li key={a} className="answer">
            <button onClick={() => onSelect(a)} className={cssClass} disabled={answerState !== ''}>
              {a}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
