import {render, screen} from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('should render same text passed into title prop', () => {
    render(<Header title="My Header" />)
    const headingElement = screen.getByText(/my header/i)
    expect(headingElement).toBeInTheDocument()
  })
})

/*
it('should render same text passed into title prop', () => {
  render(<Header title="My Header" />)
  const headingElement = screen.getByRole('heading', {name: 'My Header'}) //name === text
  expect(headingElement).toBeInTheDocument()
})

it('should render same text passed into title prop', () => {
  render(<Header title="My Header" />)
  const headingElement = screen.getByTitle('Header')
  expect(headingElement).toBeInTheDocument()
})

it('should render same text passed into title prop', () => {
  render(<Header title="My Header" />)
  const headingElement = screen.getByTestId('header-1')
  expect(headingElement).toBeInTheDocument()
})

// findBy
it('should render same text passed into title prop', async () => {
  render(<Header title="My Header" />)
  const headingElement = await screen.findByText(/my header/i)
  expect(headingElement).toBeInTheDocument()
})

// queryBy
it('should render same text passed into title prop', async () => {
  render(<Header title="My Header" />)
  const headingElement = screen.queryByText(/not existing text/i)
  expect(headingElement).not.toBeInTheDocument()
})

//getAllBy
it('should render same text passed into title prop', async () => {
  render(<Header title="My Header" />)
  const headingElements = screen.getAllByRole('heading')
  expect(headingElements.length).toBe(2)
})
*/
