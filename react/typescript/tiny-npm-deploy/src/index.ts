#!/usr/bin/env node
// to make it very clear that this is a file that can be directly executed from the terminal
// we directly execute it rather that writing `node` in front of the filename in the CLI
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.listen(3005, () => {
  console.log('Listening on port 3005...')
})
