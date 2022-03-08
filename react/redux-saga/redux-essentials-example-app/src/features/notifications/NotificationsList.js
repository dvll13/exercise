import React, { useLayoutEffect } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { allNotificationsRead, selectAllNotifications } from './notificationsSlice'

const NotificationsList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const notifications = useSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || { name: 'Unknown user' }

    const notificationClassname = classnames('notification', {
      new: notification.isNew
    })

    return (
      <div className={notificationClassname} key={notification.id}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList
