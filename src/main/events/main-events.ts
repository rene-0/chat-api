import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { adaptConnectionEvent } from '../adapters/socket-io-event-connection-adapter'
import { makeConnectionController } from '../factories/controllers/web-socket/connection-controller-factory'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  server.on('connection', adaptConnectionEvent(makeConnectionController(), server))
}
