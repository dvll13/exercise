import './text-editor.css'
import { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('# Header')

  const editingContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (editingContainer.current && event.target && editingContainer.current.contains(event.target as Node)) return
      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div ref={editingContainer} className="text-editor">
        <MDEditor
          value={value}
          onChange={(newValue) => {
            setValue(newValue || '')
          }}
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        setEditing(true)
      }}
      className="text-editor card"
    >
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  )
}

export default TextEditor
