import { useState, useEffect } from 'react'

export function useFetch(fetchFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const data = await fetchFn()
        setFetchedData(data)
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' })
      }
      setIsLoading(false)
    }

    fetchPlaces()
  }, [fetchFn])

  return { fetchedData, isLoading, error, setFetchedData }
}
