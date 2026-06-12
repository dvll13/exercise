import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import EventItem from './EventItem.jsx'
import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../../util/http.js'

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }], // used for caching
    // queryFn: ({ signal }) => fetchEvents({ max: 3, signal }),
    queryFn: ({ signal, queryKey }) => fetchEvents({ ...queryKey[1], signal }), // same as above
    staleTime: 5000, // don't check for updated BE data if the component is re-rendered in the next 5 sec [0]
    // gcTime: 3000, // garbage collection keep time (after that the cached data will be discarded and there'll be a request for new data in the next re-render, loading spinner and so on) [default 5 min]
  })

  let content

  if (isPending) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  )
}
