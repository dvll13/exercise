import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layout'
import NotFound from '../pages/core/NotFound'

const Home = React.lazy(() => import('../pages/core/Home'))
const Signup = React.lazy(() => import('../pages/user/Signup'))

export const routes = [
  { name: 'Home', component: <Home /> },
  { name: 'Sign up', component: <Signup />, path: '/signup' }
]

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ name, component, path }) => (
          <Route
            index={!path}
            path={path}
            element={<Suspense fallback={<p>Loading {name} page...</p>}>{component}</Suspense>}
            key={name}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
