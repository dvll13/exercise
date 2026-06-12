import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, open, onClose, className = '' }) {
  const dialogRef = useRef()

  useEffect(() => {
    const dialog = dialogRef.current // just in case the ref gets assigned to a different value between this execution and the cleanup's
    if (open) {
      dialog.showModal()
    }

    return () => dialog.close() // will run before the next effect's trigger
  }, [open])

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  )
}
