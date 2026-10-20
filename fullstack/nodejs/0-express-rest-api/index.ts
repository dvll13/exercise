import express, { type Express, type Request, type Response } from 'express'
import userRoutes from './routes/users.route.ts'

// create a server that will start listening continuously on a certain port
const app: Express = express()

// a specific method in Express.js used to define route handlers for GET requests. It is one of the HTTP method-specific functions provided by Express.js for routing, along with app.post(), app.put(), app.delete(), etc.
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

// a versatile method in Express.js used to define middleware functions that are executed for every request made to the application. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
// app.use('/test', (req: Request, res: Response) => {
//   console.log('Log test') // to terminal
//   // res.status(201)
//   // res.send('Response test') // to browser

//   res.status(200).send('Some response text')
// })

app.use('/users', userRoutes)

app.listen(3000, () => {
  console.log('Server started!') // logged in the terminal
})
