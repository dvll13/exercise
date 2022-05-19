// import serve from 'local-api'
// serve()
import { program } from 'commander'
import { serveCommand } from './commands/serve'

program.addCommand(serveCommand)
// .addCommand(loginCommand)
// .addCommand(publishCommand) and so on, other commands  can be chained

program.parse(process.argv) // check the CLI arguments, try to parse them, figure out what command the user is trying to run and execute it
