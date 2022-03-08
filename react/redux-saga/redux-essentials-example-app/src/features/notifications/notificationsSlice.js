import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
  return response.data
})

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state) {
      // state.forEach((notification) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    }
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      // state.push(...action.payload)
      notificationsAdapter.upsertMany(state, action.payload)
      // state.forEach((notification) => {
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })

      // Sort with newest first
      // state.sort((a, b) => b.date.localeCompare(a.date))
    }
  }
})

// export const selectAllNotifications = (state) => state.notifications
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors((state) => state.notifications)

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer
