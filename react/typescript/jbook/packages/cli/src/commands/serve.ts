import { Command } from 'commander'
import { serve } from 'local-api'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
  .command('serve [filename]') // [] - optional value
  .description('Open a command for editing')
  .option('-p, --port <number>', 'port to run server on', '4005') // <> - required value if -p or --port is provided
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename)) // joins current path and relative path of the file (from current)
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction) // returns a custom Promise so we could catch any async error
      console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`)
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.')
      } else {
        console.error(`Here's the error: ${error.message}`)
      }
      process.exit(1) // exit our program with un unsuccessful code of 1
    }
  }) // gets called whenever the user runs the `serve` command
