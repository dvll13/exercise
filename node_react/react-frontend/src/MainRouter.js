import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './core/Home'
import NotFound from './core/NotFound'
import Signup from './user/Signup'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter
