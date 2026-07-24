import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, className = '', children, onClose }) {
  const dialogRef = useRef()

  useEffect(() => {
    const modal = dialogRef.current
    if (open) {
      modal.showModal() // when opened programmatically like that, certain features like the backdrop would work
    }

    return () => {
      modal.close()
    }
  }, [open])

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  )
}
