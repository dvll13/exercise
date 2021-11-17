import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import ToDoFooter from '../TodoFooter'

const MockToDoFooter = ({numberOfIncompleteTasks}) => {
  return (
    <BrowserRouter>
      <ToDoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
  )
}

describe('ToDoFooter', () => {
  it('should render the number of incomplete tasks text', () => {
    render(<MockToDoFooter numberOfIncompleteTasks={5} />)
    const paragraphElement = screen.getByText(/5 tasks left/i)
    //   expect(paragraphElement).toBeInTheDocument()
    //   expect(paragraphElement).toHaveTextContent('tasks')
    //   expect(paragraphElement).toContainHTML('p')
    //   expect(paragraphElement.textContent).toBe('5 tasks left')
    expect(paragraphElement).toBeVisible()
  })

  it(`should render "task" text when there's one incomplete task`, () => {
    render(<MockToDoFooter numberOfIncompleteTasks={1} />)
    const paragraphElement = screen.getByText(/1 task left/i)
    expect(paragraphElement).toBeTruthy()
  })
})
