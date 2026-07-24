import Places from './Places.jsx'
import ErrorPage from './Error.jsx'
import { fetchAvailablePlaces } from '../http.js'
import { useFetch } from '../hooks/useFetch.js'
import { sortPlacesByDistance } from '../loc.js'

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces()
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, _reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
      resolve(sortedPlaces)
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlaces, setAvailablePl aces] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   // fetch('http://localhost:3000/places')
  //   //   .then((response) => {
  //   //     return response.json()
  //   //   })
  //   //   .then((resData) => {
  //   //     setAvailablePlaces(resData.places)
  //   //   })

  //   async function fetchPlaces() {
  //     setIsLoading(true)

  //     try {
  //       const places = await fetchAvailablePlaces()

  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
  //         setIsLoading(false)
  //         setAvailablePlaces(sortedPlaces)
  //       })
  //     } catch (error) {
  //       setError({ message: error.message || 'Could not fetch places data.' })
  //     }
  //   }

  //   fetchPlaces()
  // }, [])

  const { fetchedData: availablePlaces, isLoading, error } = useFetch(fetchSortedPlaces, [])

  if (error) {
    return <ErrorPage title="An error occurred." message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  )
}
