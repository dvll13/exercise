import { Await, Link, redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'
import { Suspense } from 'react'

export default function EventDetailPage() {
  // const params = useParams()
  // params.eventId

  // const data = useLoaderData()
  const { event, events } = useRouteLoaderData('event-detail')

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadEvents} />}</Await>
      </Suspense>

      <Link to=".." relative="relative">
        Back ?
      </Link>
    </>
  )
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id)

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch event' }), { status: 500 })
  } else {
    const resData = await response.json()
    return resData.event
  }
}

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

export async function loader({ request, params }) {
  // const response = await fetch('http://localhost:8080/events/' + params.eventId)

  // if (!response.ok) {
  //   throw new Response(JSON.stringify({ message: 'Could not fetch event' }), { status: 500 })
  // } else {
  //   return response
  // }

  const id = params.eventId

  // return defer({
  //   event: await loadEvent(id),
  //   events: loadEvents(),
  // })
}

export async function action({ params, request }) {
  const response = await fetch('http://localhost:8080/events' + params.eventId, { method: request.method })

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event' }), { status: 500 })
  }

  return redirect('/events')
}
