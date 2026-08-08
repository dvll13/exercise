import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      {/* <dialog open className="modal">
        <h2>{title}</h2>
        {children}
      </dialog> */}

      {/* <motion.dialog
        initial={{ opacity: 0, y: 30 }} // start from these values immediately on element add to the DOM
        animate={{ opacity: 1, y: 0 }} // animate to these after the element appears
        exit={{ opacity: 0, y: 30 }} // the state we want to animate to when the el is removed from the dom
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog> */}

      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal'),
  )
}
