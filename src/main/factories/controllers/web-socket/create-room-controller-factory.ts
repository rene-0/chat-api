import { CreateRoomController } from '../../../../presentation/controllers/web-socket/create-room-controller'
import { makeDbCreateRoom } from '../../usecases/rooms/db-create-room-fatory'

export const makeCreateRoomController = (): CreateRoomController => {
  return new CreateRoomController(makeDbCreateRoom())
}
