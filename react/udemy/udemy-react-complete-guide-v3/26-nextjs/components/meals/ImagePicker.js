'use client'

import { useRef, useState } from 'react'
import classes from './ImagePicker.module.css'
import Image from 'next/image'

export default function ImagePicker({ name, label }) {
  const [pickedImage, setPickedImage] = useState()

  const imageInputRef = useRef()

  function handlePickClick() {
    imageInputRef.current.click()
  }

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    // generate Data URL
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Picked image by the user" fill />}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          // multiple
          className={classes.input}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button type="button" className={classes.button} onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
