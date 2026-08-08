// export interface Todo {
//   id: string
//   text: string
// }

class Todo {
  id: string
  text: string

  constructor(todoText: string) {
    this.text = todoText
    this.id = new Date().toISOString()
  }
}

export default Todo
