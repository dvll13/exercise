import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

// using forwardRef() since refs can't be passed to fn components as normal props.
// the ref then comes as a second parameter after the props object
const ResultModal = forwardRef(function ResultModal({ targetTime, timeRemaining, onReset }, ref) {
  const dialogRef = useRef()

  const userWon = timeRemaining > 0
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2)
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)

  useImperativeHandle(ref, () => ({
    open: () => {
      // we expose these to the passed ref
      dialogRef.current.showModal()
    },
  }))

  return createPortal(
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
      <h2>{userWon ? `Your score: ${score}` : 'You lost'}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      {userWon && (
        <p>
          You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
      )}

      <form method="dialog" /*onSubmit={onReset}*/>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal'),
  )
})

export default ResultModal
