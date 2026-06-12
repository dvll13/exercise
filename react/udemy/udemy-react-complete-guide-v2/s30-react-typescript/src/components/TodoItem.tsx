import classes from './TodoItem.module.css'

type Props = {
  text: string
  onRemove: () => void
}

const TodoItem: React.FC<Props> = (props) => {
  return (
    <li className={classes.item} onClick={props.onRemove}>
      {props.text}
    </li>
  )
}

export default TodoItem
