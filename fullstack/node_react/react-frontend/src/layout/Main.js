import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { routes } from '../routes/MainRouter'

const Main = () => {
  console.log(routes)
  return (
    <div>
      <nav>
        <ul>
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Link to={path || '/'}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}

export default Main
