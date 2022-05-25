import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { createCellsRouter } from './routes/cells'

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express()

  if (useProxy) {
    // DEV mode

    app.use(createCellsRouter(filename, dir))

    // proxy from the default port 4005 to 3000
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true, // CRA uses websockets to tell the browser that a file is changed
        logLevel: 'silent'
      })
    )
  } else {
    // PROD mode
    const packagePath = require.resolve('local-client/build/index.html')
    // require.resolve() uses the node's algorithm to find the path to a file, so we get the ABSOLUTE path to it in the end; will find it in the user's node_modules directory

    // Static Middleware
    app.use(express.static(path.dirname(packagePath)))
    // path.dirname() gives the path from the current to the target folder
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
  // wrapping in a Promise, because we cannot catch errors otherwise in the serve.ts (async error in try-catch)
  // if the server starts successfully, then the resolve fn will be called
  // if something goes wrong while starting the server, then the reject fn will be called, which will reject our Promise and put it in an error state, that will cause the try-catch block from cli's serve.ts to now catch the error (its parent fn should be async)
}
