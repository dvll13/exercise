import MealItem from './MealItem'
import useHttp from '../hooks/useHttp'
import Error from './Error'

const requestConfig = {}

export default function Meals() {
  const { data: loadedMeals, error, isLoading } = useHttp('http://localhost:3000/meals', requestConfig, [])
  // const [loadedMeals, setLoadedMeals] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch('http://localhost:3000/meals')
  //       if (response.ok) {
  //         const meals = await response.json()
  //         setLoadedMeals(meals)
  //       } else {
  //         throw new Error('Something went wrong.')
  //       }
  //     } catch (e) {
  //       setError('Failed to fetch meals: ' + e.message)
  //     }
  //     setIsLoading(false)
  //   }
  //   fetchMeals()
  // }, [])

  if (isLoading) return <p className="center">Loading meals...</p>
  if (error) return <Error title="Failed to fetch meals" message={error} />
  if (!loadedMeals?.length) return <p className="center">No meals available.</p>

  return (
    <ul id="meals">
      {loadedMeals.map((m) => {
        return (
          <li className="meal-item" key={m.id}>
            <MealItem meal={m} />
          </li>
        )
      })}
    </ul>
  )
}
