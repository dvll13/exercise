import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'
import userEvent from '@testing-library/user-event'

describe('Greeting component', () => {
  test('renders Hello world as a text', () => {
    // AAA:

    // Arrange
    render(<Greeting />)

    // Act
    // ...

    // Assert
    const helloWorldElement = screen.getByText('Hello World', { exact: false })
    expect(helloWorldElement).toBeInTheDocument()
  })

  test(`renders "good to see you" if the button was not clicked`, () => {
    render(<Greeting />)

    const paragraphElement = screen.getByText("It's good to see you!")
    expect(paragraphElement).toBeInTheDocument()
  })

  test(`renders "Changed!" if the button was clicked`, () => {
    // Arrange
    render(<Greeting />)

    // Act
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement)

    // Assert
    const outputElement = screen.getByText('Changed!')
    expect(outputElement).toBeInTheDocument()
  })

  test(`does not render "good to see you" if the button was clicked`, () => {
    render(<Greeting />)

    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement)

    const paragraphElement = screen.queryByText('good to see you', { exact: false })
    // expect(paragraphElement).not.toBeInTheDocument()
    expect(paragraphElement).toBeNull()
  })
})
