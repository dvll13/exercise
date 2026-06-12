import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'
import { Suspense } from 'react'

export default function EventDetailPage() {
  // const { eventId } = useParams()
  const { event, events } = useRouteLoaderData('event-detail') // uses route.id unlike useLoaderData
  return (
    <>
      <Suspense fallback="Loading...">
        <Await resolve={event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
      </Suspense>
      <Suspense fallback="Loading...">
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  )
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id)

  if (!response.ok) {
    return json({ message: 'Could not delete event.' }, { status: 500 })
  }
  const resData = await response.json()
  return resData.event
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events.' }, { status: 500 })
  } else {
    const resData = await response.json()
    return resData.events
  }
}

export async function eventDetailsLoader({ request, params }) {
  const id = params.eventId
  // here it loads data simultaneously
  return defer({
    event: await loadEvent(id), // adding await - waits for this data to be loaded before loading the component
    events: loadEvents(), // will load this data after the page is loaded
  })
}

export async function eventDeleteAction({ params, request }) {
  const eventId = { params }
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method, // 'DELETE'
  })

  if (!response.ok) {
    return json({ message: 'Could not delete event.' }, { status: 500 })
  }
  return redirect('/events')
}
