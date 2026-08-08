import { use } from 'react'
import TodoItem from './TodoItem'
import classes from './Todos.module.css'
import { TodosContext } from '../store/todos-context'

// interface TodosProps {
//   items: Todo[]
//   onRemoveTodo: (id: string) => void
// }

// const Todos: React.FC<TodosProps> = ({ items, onRemoveTodo }) => {
const Todos: React.FC = () => {
  const { items, removeTodo } = use(TodosContext)

  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem key={item.id} text={item.text} onRemoveTodo={() => removeTodo(item.id)} />
      ))}
    </ul>
  )
}

export default Todos
