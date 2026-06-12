import { useState, useEffect } from 'react'

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(initialValue)

  useEffect(() => {
    ;(async function fetchData() {
      setIsFetching(true)
      try {
        const fetchedData = await fetchFn()
        setData(fetchedData)
        console.log({ fetchData })
      } catch (err) {
        setError(err.message)
      }
      setIsFetching(false)
    })()
  }, [fetchFn])

  return { data, setData, isFetching, error }
}
