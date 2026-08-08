import { render, screen } from '@testing-library/react'
import Async from './Async'

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // replace `fetch` with a mock fn
    window.fetch = jest.fn()
    // set a value this fn should resolve to when being called
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    })

    render(<Async />)

    // find* for async actions; RTL will re-evaluate
    // the screen a couple of times before this succeeds
    // const listItemEls = await screen.findAllByRole('listitem', {}, {timeout: 1000}) // default timeout
    const listItemEls = await screen.findAllByRole('listitem')
    // screen.debug()
    expect(listItemEls).not.toHaveLength(0)
  })
})
