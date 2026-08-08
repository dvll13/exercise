import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'
import userEvent from '@testing-library/user-event'

// three AAAs

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />)

    // Act
    // ... nothing

    // Assert
    //   screen.getByText(/hello world/i)
    //   screen.getByText('Hello world', { exact: false })
    const helloWorldEl = screen.getByText('Hello World!')

    //   expect(helloWorldEl).not.toBeInTheDocument();
    expect(helloWorldEl).toBeInTheDocument()
  })

  test('renders "your stay" if the button was NOT clicked', () => {
    render(<Greeting />)
    const outputEl = screen.getByText('your stay', { exact: false })
    expect(outputEl).toBeInTheDocument()
  })

  test('renders "Changed!" if the button WAS clicked', async () => {
    // Arrange
    render(<Greeting />)

    // Act
    const buttonEl = screen.getByRole('button')
    await userEvent.click(buttonEl)

    // Assert
    const textEl = screen.getByText('Changed!')
    expect(textEl).toBeInTheDocument()
  })

  test('does not render "Enjoy your stay!" if the button was clicked', async () => {
    // Arrange
    render(<Greeting />)

    // Act
    const buttonEl = screen.getByRole('button')
    await userEvent.click(buttonEl)

    // Assert
    const textEl = screen.queryByText('Enjoy your stay', { exact: false })
    expect(textEl).toBeNull()
  })
})
