import './text-editor.css'
import { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false)
  const { updateCell } = useActions()

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
          value={cell.content}
          onChange={(newValue) => {
            updateCell(cell.id, newValue || '')
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
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  )
}

export default TextEditor
