import { Link, redirect, useNavigate, useParams, useSubmit } from 'react-router-dom'

import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
// import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'

export default function EditEvent() {
  const navigate = useNavigate()
  const params = useParams()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 5000, // could be added to avoid duplicate requests from TQ and RR
  })

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const updatedEventData = data.event
      await queryClient.cancelQueries({ queryKey: ['events', params.id] }) // cancel outgoing useQuery() queries for the same key so that we don't have clashing response data for them and our optimistically updated data; otherwise we would've fetched old data
      const previousEvent = queryClient.getQueryData(['events', params.id]) // for rollback purposes when error occurs
      queryClient.setQueryData(['events', params.id], updatedEventData) // (optimistic) update the data before the response arrives

      return { previousEvent } // in order to be able to use it as context in onError, so we rollback changes
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousEvent) // rollback the optimistic update
    },
    onSettled: () => {
      // gets called every time mutationFn is done, no matter failed or succeeded
      queryClient.invalidateQueries(['events', params.id]) // to make sure FE and BE data related to this key is synced
    },
  })

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData })
    navigate('../')
  }

  const submit = useSubmit()

  function handleSubmitAlt(formData) {
    // trigger the action
    submit(formData, { method: 'PUT' }) // all but 'GET' would trigger the action
  }

  function handleClose() {
    navigate('../')
  }

  let content

  // if (isPending) {
  //   content = (
  //     <div className="center">
  //       <LoadingIndicator />
  //     </div>
  //   )
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Error fetching" message={error.item?.message} />
        <div className="form-actions">
          <Link to="..">Okay</Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return <Modal onClose={handleClose}>{content}</Modal>
}

// ALTERNATIVE APPROACH USING REACT ROUTER:

// will be triggered before the EditEvent component loads, TQ will cache it
// and then the useQuery() hook will load the data from cache;
// also the isPending check becomes unnecessary then
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  })
}

// triggers on form submit
// alt approach that would replace the Optimistic Update approach from the component
export async function action({ request, params }) {
  const formData = await request.formData()
  const updatedEventData = Object.fromEntries(formData)

  await updateEvent({ id: params.id, event: updatedEventData }) // from utils/http.js
  await queryClient.invalidateQueries(['events'])

  return redirect('../') // to the parent page
}
