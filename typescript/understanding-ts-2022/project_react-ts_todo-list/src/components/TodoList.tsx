import React from 'react'
import { Todo } from '../todo.model'
import './TodoList.css'

interface TodoListProps {
  items: Todo[]
  onDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.text}</span>
          <button onClick={onDeleteTodo.bind(null, item.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
