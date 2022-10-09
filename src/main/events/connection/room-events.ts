import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { adaptEvent } from '../../adapters/socket-io-event-adapter'
import { makeRoomMessageController } from '../../factories/controllers/web-socket/room-message-controller-factory'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  socket.on('roomMessage', adaptEvent(makeRoomMessageController(), server, socket))
}
