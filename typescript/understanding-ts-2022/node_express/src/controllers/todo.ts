// import { Request, Response, NextFunction } from 'express'
import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

// mimic a db, will be reset on every server reload
const TODOS: Todo[] = [] // every class automatically act also as a type

// export const createTodo = (req: Request, res: Response, next: NextFunction) => {}
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id
  const updatedText = (req.body as { text: string }).text

  const editedTodoIndex = TODOS.findIndex((todo) => todo.id === id)

  if (editedTodoIndex < 0) {
    // will trigger the error handling MW
    throw new Error(`Couldn't find the todo!`)
  }

  TODOS[editedTodoIndex].text = updatedText
  // TODOS[editedTodoIndex] = new Todo(id, updatedText)
  res.json({ message: 'Update successful!', updatedTodo: TODOS[editedTodoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id
  // TODOS = TODOS.filter(todo => todo.id !== id)

  const deletedTodoIndex = TODOS.findIndex((todo) => todo.id === id)

  if (deletedTodoIndex < 0) {
    throw new Error(`Couldn't find a todo with id='${id}' to delete!`)
  }

  TODOS.splice(deletedTodoIndex, 1)

  res.json({ message: `Todo with id='${id}' deleted.`, todos: TODOS })
}
