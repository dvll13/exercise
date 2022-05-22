import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

const fileEncoding = 'utf-8'

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json()) // use request body-parsing middleware

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, { encoding: fileEncoding })
      res.send(JSON.parse(result))
    } catch (error: any) {
      // if read throws an error:
      // inspect the error, see if it says that the file doesn't exist
      if (error.code === 'ENOENT') {
        // create a file and add default cells
        await fs.writeFile(fullPath, '[]', fileEncoding)
        // send the list of cells back to the browser
        res.send([])
      } else {
        throw error
      }
    }
  })

  router.post('/cells', async (req, res) => {
    // the write fn will create the file automatically if it doesn't exist
    // take the list of cells from the request object
    // serialize them (turn them into a format that can be safely written into the file)
    const { cells }: { cells: Cell[] } = req.body

    // write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), fileEncoding) // utf-8 ~ plain text

    res.send({ status: 'ok' })
  })

  return router
}
