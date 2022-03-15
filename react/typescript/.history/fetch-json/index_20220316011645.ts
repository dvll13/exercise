import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

interface Todo {
  id: number
  title: string
  completed: string
}

axios.get(url).then((response) => {
  const todo = response.data as Todo

  // const ID = todo.ID
  // const title = todo.Title
  // const finished = todo.finished
  const id = todo.id
  const title = todo.title
  const completed = todo.completed

  logToDo(id, title, completed)
})

const logToDo = (id: number, title: string, completed: boolean) => {
  console.log({ id, title, completed })
}
