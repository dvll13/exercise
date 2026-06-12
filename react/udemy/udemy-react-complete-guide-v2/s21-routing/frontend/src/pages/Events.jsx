import { Await, defer, json, useLoaderData } from 'react-router-dom'
import EventsList from '../components/EventsList'
import { Suspense } from 'react'

function EventsPage() {
  // FETCHING LOGIC IS MOVED NOW TO THE ROUTER LOADER FUNCTION IN APP.JS AND RECEIVED BY THIS HOOK !!!
  // const data = useLoaderData()

  // if (data.isError) {
  //   return <p>{data.message}</p>
  // }

  // const events = data.events

  // return <EventsList events={events} />

  // if we want to use deferred data:
  const { events } = useLoaderData()

  // between the tags we put the function that should be executed once da awaited data is there
  return (
    <Suspense fallback="Loading...">
      <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
    </Suspense>
  )

  // THIS HOOK COULD ALSO BE USED IN THE CHILD COMPONENTS:

  // const [isLoading, setIsLoading] = useState(false)
  // const [fetchedEvents, setFetchedEvents] = useState()
  // const [error, setError] = useState()

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true)
  //     // const response = await fetch('http://localhost:8080/events')

  //     // if (!response.ok) {
  //     //   setError('Fetching events failed.')
  //     // } else {
  //     //   const resData = await response.json()
  //     //   setFetchedEvents(resData.events)
  //     // }
  //     setIsLoading(false)
  //   }

  //   fetchEvents()
  // }, [])
  // return (
  //   <>
  //     <div style={{ textAlign: 'center' }}>
  //       {isLoading && <p>Loading...</p>}
  //       {error && <p>{error}</p>}
  //     </div>
  //     {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
  //   </>
  // )
}

export default EventsPage

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events. ' }
    // return new Response( // allows also throwing a status property
    //   JSON.stringify({
    //     message: 'Could not fetch events.',
    //   }),
    //   { status: 500 },
    // )

    // OR JUST USE:

    return json(
      {
        message: 'Could not fetch events',
      },
      {
        status: 500,
      },
    )

    // will be handled automatically in Error.jsx
  } else {
    // const resData = await response.json()
    // return resData.events // the returned data will be received through the useLoaderData() hook
    // const res = new Response()
    // return response // router supports response objects and resolves the data automatically

    // after adding differ()
    const resData = await response.json()
    return resData.events
  }
}

export function eventsLoader() {
  // consists of custom keys and promises
  return defer({
    events: loadEvents(),
  })
}
