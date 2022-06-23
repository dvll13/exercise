// const express = require('express')
import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'
import todoRoutes from './routes/todos'

const app = express()

// this MW will parse the bodies of all coming requests and extract any json data it finds in there to populate the req.body with the parsed json data
app.use(json())

// forward all requests that start with '/todo' to todoRoutes
app.use('/todos', todoRoutes)

// error handling middleware function
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(3000)
