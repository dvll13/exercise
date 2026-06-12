import { Link, redirect, useNavigate, useParams } from 'react-router-dom'

import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import LoadingIndicator from '../UI/LoadingIndicator.jsx'

export default function EditEvent() {
  const navigate = useNavigate()
  const { id } = useParams()

  // if we are using the alternative router approach
  // const submit = useSubmit()
  // const { state } = useNavigation()
  // const isPending = state === 'submitting'

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    // staleTime: 10000 - to avoid an immediate second request if a loader() is used
  })

  // would not be needed for the alternative react router way
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // onSuccess: () => {
    // queryClient.invalidateQueries()
    // },

    // will do OPTIMISTIC UPDATE instead:
    onMutate: async (data) => {
      // gets called immediately after the mutate(data) is executed
      const newEvent = data.event
      // cancel so that we don't have clashing data between ongoing queries response data and the optimistic data and the current query data
      await queryClient.cancelQueries({ queryKey: ['events', id] }) // cancels queries, not mutations!!!

      // in order to be able revert to the old data on BE error
      const previousEventData = queryClient.getQueryData(['events', id])

      queryClient.setQueryData(['events', id], newEvent) // overrides cached data

      return { previousEventData } // the return value gets passed to the onError context
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEventData)
    },
    // will be called when the mutationFn is done no matter if it failed or succeeded:
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]) // just in case, to make sure BE and FE data is in sync in the end
    },
  })

  function handleSubmit(formData) {
    mutate({ id, event: formData })
    navigate('../')

    // if we are using the alternative router approach
    // submit(formData, { method: 'PUT' })
  }

  function handleClose() {
    navigate('../')
  }

  let content

  // not needed if we use a router loader() fn
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    )
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Failed to load event" message={error.info?.message || 'Please try again later.'} />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <>
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      </>
    )
  }

  return <Modal onClose={handleClose}>{content}</Modal>
}

// ALTERNATIVE WAY: react router could also be used to load data in conjunction query
// this will fetch data before the component loads and then it will be re-fetched if needed by the useQuery() hook
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  })
}

// will be triggered automatically when the form is submitted (with any method !== 'GET')
export async function action({ request, params }) {
  const formData = await request.formData()
  const updatedEventData = Object.fromEntries(formData)
  await updateEvent({ id: params.id, event: updatedEventData })
  await queryClient.invalidateQueries(['events'])
  // this will skip our optimistic update method from above, so it would have to be re-implemented

  return redirect('../')
}
