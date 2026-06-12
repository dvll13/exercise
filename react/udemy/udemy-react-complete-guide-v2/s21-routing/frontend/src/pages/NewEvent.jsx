import EventForm from '../components/EventForm'

export default function NewEventPage() {
  function submitHandler(e) {
    e.preventDefault()
  }

  return <EventForm method="post" onSubmit={submitHandler} />
}
