import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './routes/MainRouter'

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
