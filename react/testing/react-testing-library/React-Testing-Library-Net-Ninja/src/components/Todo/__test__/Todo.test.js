import {render, screen, fireEvent} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import Todo from '../Todo'

const MockedTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
}

const addTasks = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/add a new task here.../i)
  const buttonElement = screen.getByRole(`button`, {name: /add/i})

  tasks.forEach((task) => {
    fireEvent.change(inputElement, {target: {value: task}})
    fireEvent.click(buttonElement)
  })
}

describe('Todo', () => {
  it('should add an item to the list', () => {
    render(<MockedTodo />)

    const newValue = `Go grocery shopping`
    addTasks([newValue])

    const listDivElement = screen.getByText(newValue)
    expect(listDivElement).toBeInTheDocument()
  })

  it('should add items to the list', () => {
    render(<MockedTodo />)

    addTasks([`go shopping`, `pet my cat`, `wash hands`])

    const taskContainerElements = screen.getAllByTestId(`task-container`)
    expect(taskContainerElements).toHaveLength(3)
  })

  it('tasks in the list should not have completed class when initially rendered', () => {
    render(<MockedTodo />)

    addTasks([`go shopping`])

    const divElement = screen.getByText(`go shopping`)
    expect(divElement).not.toHaveClass(`todo-item-active`)
  })

  it('tasks in the list should have completed class when clicked', () => {
    render(<MockedTodo />)

    addTasks([`go shopping`])

    const divElement = screen.getByText(`go shopping`)
    fireEvent.click(divElement)

    expect(divElement).toHaveClass(`todo-item-active`)
  })
})
