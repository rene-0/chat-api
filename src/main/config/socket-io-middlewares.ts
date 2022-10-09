import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { socketAuth } from '../middlewares/web-socket/authentication/auth-midleware'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  server.use(socketAuth)
}
