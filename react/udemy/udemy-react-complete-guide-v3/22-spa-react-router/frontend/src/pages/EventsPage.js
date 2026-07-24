import { useLoaderData, defer } from 'react-router-dom'
import EventsList from '../components/EventsList'

function EventsPage() {
  const data = useLoaderData()

  // if (data.isError) return <p>{data.message}</p>

  return <EventsList events={data} />
}

export default EventsPage

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch data.' }
    // throw new Error('An error occurred')
    throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 })
    // throw json({ message: 'Could not fetch events.' }, { status: 500 })
  } else {
    const resData = await response.json()
    return resData.events
  }
}

export async function eventsLoader() {
  return { events: loadEvents() }
}
