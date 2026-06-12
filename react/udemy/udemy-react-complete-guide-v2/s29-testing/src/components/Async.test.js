import { render, screen } from '@testing-library/react'
import Async from './Async'

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // mock fetch data (override build-in fetch function and return a result)
    window.fetch = jest.fn()
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    })

    render(<Async />)

    // checks a few times during a timeout that could be set, defaults to 1 sec
    const listItemElements = await screen.findAllByRole('listitem')
    expect(listItemElements).not.toHaveLength(0)
  })
})
