import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home'
// import PostPage, { loader as postLoader } from './pages/Post'
import RootLayout from './pages/Root'
import { lazy, Suspense } from 'react'

// lazy loading the page #1/2
const BlogPage = lazy(() => import('./pages/Blog'))
const PostPage = lazy(() => import('./pages/Post'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ), // lazy loading the page #2/2
            loader: () => import('./pages/Blog').then((module) => module.loader()), // lazy loading the loader()
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: ({ params }) => import('./pages/Post').then((module) => module.loader({ params })),
            // meta object = { params, ... }
          },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
