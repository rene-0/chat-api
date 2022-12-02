import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { adaptEvent } from '../../adapters/socket-io-event-adapter'
import { makeRoomMessageController, makeUpdateRoomMessageController } from '../../factories/controllers/web-socket'
import { makeAddUserToRoomController } from '../../factories/controllers/web-socket/add-user-to-room-controller-factory'
import { makeCreateRoomController } from '../../factories/controllers/web-socket/create-room-controller-factory'
import { makeDeleteRoomController } from '../../factories/controllers/web-socket/delete-room-message-controller-factory'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  socket.on('createRoom', adaptEvent(makeCreateRoomController(), server, socket))
  socket.on('roomMessage', adaptEvent(makeRoomMessageController(), server, socket))
  socket.on('updateRoomMessage', adaptEvent(makeUpdateRoomMessageController(), server, socket))
  socket.on('deleteRoomMessage', adaptEvent(makeDeleteRoomController(), server, socket))
  socket.on('addUserToRoom', adaptEvent(makeAddUserToRoomController(), server, socket))
}
