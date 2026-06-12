import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom'

import classes from './EventForm.module.css'

function EventForm({ method, event }) {
  const data = useActionData()
  const navigate = useNavigate()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  function cancelHandler() {
    navigate('..')
  }

  // Form automatically triggers the action function of the currently active route
  // with the action="some-other-path" attribute though it could send request to another route's action
  return (
    <Form method={method} className={classes.form}>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?.title || ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?.image || ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event?.date || ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event?.description || ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  )
}

export default EventForm

export async function addEditEventAction({ request, params }) {
  const { method } = request
  const data = await request.formData() // getting router's Form data
  const eventData = {
    title: data.get('title'), // get by field name
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  let url = 'http://localhost:8080/events'
  if (method === 'PATCH') {
    const { eventId } = params
    url = 'http://localhost:8080/events/' + eventId
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  // backend validation failed
  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event' }, { status: 500 })
  }

  return redirect('/events')
}
