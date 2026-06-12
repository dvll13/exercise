import { useContext } from 'react'
import TodoItem from './TodoItem'
import classes from './Todos.module.css'
import { TodosContext } from '../store/todos-context'

// type Props = { items: Todo[]; onRemoveTodo: (id: string) => void; children?: React.ReactNode }

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext)

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        // <TodoItem key={item.id} text={item.text} onRemove={onRemoveTodo.bind(null, item.id)} />
        <TodoItem key={item.id} text={item.text} onRemove={todosCtx.removeTodo.bind(null, item.id)} />
      ))}
    </ul>
  )
}

export default Todos
