import { useContext, useRef } from 'react'
import classes from './NewTodo.module.css'
import { TodosContext } from '../store/todos-context'

// type Props = {
//   onAddTodo: (text: string) => void
// }

const NewTodo: React.FC = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null)

  const todosCtx = useContext(TodosContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const enteredText = todoTextInputRef.current!.value
    if (enteredText.length === 0) return

    todosCtx.addTodo(enteredText)

    todoTextInputRef.current!.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  )
}

export default NewTodo
