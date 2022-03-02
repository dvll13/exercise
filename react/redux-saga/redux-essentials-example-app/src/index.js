import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './app/store'

import { worker } from './api/server'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import { fetchUsers } from './features/users/usersSlice'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'
import NotificationsList from './features/notifications/NotificationsList'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchUsers())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <>
                    <AddPostForm />
                    <PostsList />
                  </>
                }
              />
              <Route exact path="/posts/:postId" element={<SinglePostPage />} />
              <Route exact path="/editPost/:postId" element={<EditPostForm />} />
              <Route exact path="/users" element={<UsersList />} />
              <Route exact path="/users/:userId" element={<UserPage />} />
              <Route exact path="/notifications" element={<NotificationsList />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
