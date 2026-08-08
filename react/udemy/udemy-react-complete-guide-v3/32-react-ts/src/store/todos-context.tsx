import { createContext, useState, type PropsWithChildren } from 'react'
import Todo from '../models/todo'

interface TodoContext {
  items: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
}

export const TodosContext = createContext<TodoContext>({
  items: [],
  addTodo: () => {},
  removeTodo: (id) => {},
})

const TodoContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  function handleAddTodo(text: string) {
    // setTodos((prev) => [...prev, new Todo(text)])
    setTodos((prev) => prev.concat(new Todo(text)))
  }

  function handleRemoveTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const contextValue: TodoContext = {
    items: todos,
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo,
  }

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

export default TodoContextProvider
