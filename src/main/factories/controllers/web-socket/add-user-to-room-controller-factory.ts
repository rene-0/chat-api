import { AddUserToRoomController } from '../../../../presentation/controllers/web-socket/add-user-to-room-controller'
import { makeDbAddUserToRoom } from '../../usecases/rooms/db-add-user-to-rooms-repository'

export const makeAddUserToRoomController = (): AddUserToRoomController => {
  return new AddUserToRoomController(makeDbAddUserToRoom())
}
