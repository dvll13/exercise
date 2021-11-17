import {render, screen, fireEvent} from '@testing-library/react'
import AddInput from '../AddInput'

const mockedSetTodos = jest.fn()

describe('AddInput', () => {
  beforeEach(() => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />)
  })

  it('should render input element', () => {
    const inputElement = screen.getByPlaceholderText(/add a new task here.../i)
    expect(inputElement).toBeInTheDocument()
  })

  it('should be able to type in the input', () => {
    const inputElement = screen.getByPlaceholderText(/add a new task here.../i)
    const newValue = `Go grocery shopping`
    fireEvent.change(inputElement, {target: {value: newValue}})
    expect(inputElement.value).toBe(newValue)
  })

  it('should have empty input when add button is clicked', () => {
    const inputElement = screen.getByPlaceholderText(/add a new task here.../i)
    const buttonElement = screen.getByRole('button', {name: /add/i})
    fireEvent.change(inputElement, {target: {value: `Go grocery shopping`}})
    fireEvent.click(buttonElement)
    expect(inputElement.value).toBe('')
  })
})
