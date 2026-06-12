import React, { useState } from 'react'
import Todo from '../models/todo'

type TodosContextObj = {
  items: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
}

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
})

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (text: string) => {
    const newTodo = new Todo(text)
    setTodos((prevTodos) => prevTodos.concat(newTodo))
  }

  const handleRemoveTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo,
  }

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

export default TodosContextProvider
