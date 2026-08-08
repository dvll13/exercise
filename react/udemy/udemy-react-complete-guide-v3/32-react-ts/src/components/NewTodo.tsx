import { use, useRef } from 'react'
import { TodosContext } from '../store/todos-context'
import classes from './NewTodo.module.css'

// const NewTodo: React.FC<{ onTodoAdd: (todo: string) => void }> = ({ onTodoAdd }) => {
const NewTodo: React.FC = () => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const { addTodo } = use(TodosContext)

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    const enteredText = textInputRef.current!.value

    if (enteredText.trim().length === 0) {
      return
    }

    addTodo(enteredText)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="new_todo">Todo text</label>
      <input type="text" id="new_todo" ref={textInputRef} />
      <button>Add Todo</button>
    </form>
  )
}

export default NewTodo
