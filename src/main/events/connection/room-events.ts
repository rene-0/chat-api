import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { adaptEvent } from '../../adapters/socket-io-event-adapter'
import { makeRoomMessageController, makeUpdateRoomMessageController } from '../../factories/controllers/web-socket'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  socket.on('roomMessage', adaptEvent(makeRoomMessageController(), server, socket))
  socket.on('updateRoomMessage', adaptEvent(makeUpdateRoomMessageController(), server, socket))
}
