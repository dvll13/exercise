import express from 'express'

export const serve = (port: number, filename: string, dir: string) => {
  const app = express()

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
  // wrapping in a Promise, because we cannot catch errors otherwise in the serve.ts (async error in try-catch)
  // if the server starts successfully, then the resolve fn will be called
  // if something goes wrong while starting the server, then the reject fn will be called, which will reject our Promise and put it in an error state, that will cause the try-catch block from cli's serve.ts to now catch the error (its parent fn should be async)
}
