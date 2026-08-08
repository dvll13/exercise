import { useContext, useRef, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'

import { ChallengesContext } from '../store/challenges-context.jsx'
import Modal from './Modal.jsx'
import images from '../assets/images.js'

export default function NewChallenge({ onDone }) {
  const [scope, animate] = useAnimate() // ref for the container el for the animate() selector; imperative trigger

  const title = useRef()
  const description = useRef()
  const deadline = useRef()

  const [selectedImage, setSelectedImage] = useState(null)
  const { addChallenge } = useContext(ChallengesContext)

  function handleSelectImage(image) {
    setSelectedImage(image)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    }

    if (!challenge.title.trim() || !challenge.description.trim() || !challenge.deadline.trim() || !challenge.image) {
      animate(
        'input, textarea', // css selector
        { x: [-10, 0, 10, 0] }, // animation
        { type: 'spring', duration: 0.2, delay: stagger(0.1) }, // transition
      )
      return
    }

    onDone()
    addChallenge(challenge)
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul id="new-challenge-images" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {images.map((image) => (
            <motion.li
              // get triggered by the parent's variants change
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] }, // using array -> anim keyframes
              }}
              // exit="visible" // (not working) override workaround so that we don't have to wait for the hidden animation on images to finish before hiding the modal
              transition={{ type: 'spring' }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  )
}
