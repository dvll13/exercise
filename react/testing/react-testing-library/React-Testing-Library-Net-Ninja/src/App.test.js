import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('App', () => {
  test('renders learn react link', () => {
    render(<MockApp />)
    const appElement = screen.getByTestId('App')
    expect(appElement).toBeTruthy()
  })
})
