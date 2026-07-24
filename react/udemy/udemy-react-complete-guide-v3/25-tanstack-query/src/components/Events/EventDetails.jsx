import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import Header from '../Header.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvent, queryClient } from '../../utils/http.js'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { useState } from 'react'
import Modal from '../UI/Modal.jsx'

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id], // NB: dynamic key here
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  })

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
    error: deletionError,
  } = useMutation({
    // mutationFn: () => deleteEvent({ id }),
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none', // data will be invalidated, but not refetched until required; otherwise it fetches the same event while being deleted
      })
      navigate('/events')
    },
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false)
  }

  function handleDelete() {
    mutate({ id })
  }

  let content

  if (isPending) content = <p>Loading...</p>
  if (isError) content = <ErrorBlock title="Error loading event data" message={error.item?.message} />

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    })

    content = (
      <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={'http://localhost:3000/' + data.image} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <>
      <Outlet />

      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h1>Are you sure?</h1>
          <p>Are you really really sure?</p>

          <div className="form-actions">
            {isPendingDeletion ? (
              <p>Deleting...</p>
            ) : (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeletion && <ErrorBlock title="Error deleting event" message={deletionError.item?.message} />}
        </Modal>
      )}

      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      {content}
    </>
  )
}
