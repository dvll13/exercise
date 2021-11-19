import React from 'react'
import axios from 'axios'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AsyncTestPage from './AsyncTestPage'

// https://www.robinwieruch.de/react-testing-library

jest.mock('axios')

describe('AsyncTestPage', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      {objectID: '1', title: 'Hello'},
      {objectID: '2', title: 'React'}
    ]

    axios.get.mockImplementationOnce(() => Promise.resolve({data: {hits: stories}}))

    render(<AsyncTestPage />)

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })

    const items = await screen.findAllByRole('listitem')

    expect(items).toHaveLength(2)
  })

  test('fetches stories from an API and displays them (more explicit)', async () => {
    const stories = [
      {objectID: '1', title: 'Hello'},
      {objectID: '2', title: 'React'}
    ]

    const promise = Promise.resolve({data: {hits: stories}})

    axios.get.mockImplementationOnce(() => promise)

    render(<AsyncTestPage />)

    await userEvent.click(screen.getByRole('button'))

    await act(() => promise)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()))

    render(<AsyncTestPage />)

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })

    const message = await screen.findByText(/Something went wrong/)

    expect(message).toBeInTheDocument()
  })
})
