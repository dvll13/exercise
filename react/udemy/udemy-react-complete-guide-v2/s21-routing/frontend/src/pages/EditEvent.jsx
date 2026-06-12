import { useRouteLoaderData } from 'react-router-dom'
import EventForm from '../components/EventForm'

export default function EditEventPage() {
  // const { eventId } = useParams()
  // return <h1>EditEventPage - {eventId}</h1>

  // const data = useLoaderData() - for not shared loader

  const data = useRouteLoaderData('event-detail') // for a loader from a higher-level
  const { event } = data

  return <EventForm method="patch" event={event} />
}
