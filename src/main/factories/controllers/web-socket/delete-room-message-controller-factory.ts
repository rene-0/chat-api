import { DeleteRoomController } from '../../../../presentation/controllers/web-socket/delete-rooom-message-controller'
import { makeDbCanDeleteRoomMessage } from '../../usecases/room-message/db-can-delete-room-message-factory'
import { makeDbDeleteRoomMessage } from '../../usecases/room-message/db-delete-room-message-factory'

export const makeDeleteRoomController = (): DeleteRoomController => {
  return new DeleteRoomController(makeDbCanDeleteRoomMessage(), makeDbDeleteRoomMessage())
}
