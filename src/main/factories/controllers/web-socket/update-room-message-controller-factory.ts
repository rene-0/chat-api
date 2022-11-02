import { UpdateRoomController } from '../../../../presentation/controllers/web-socket/update-rooom-message-controller'
import { makeDbCanUpdateRoomMessage } from '../../usecases/room-message/db-can-update-room-message-factory'
import { makeDbUpdateRoomMessage } from '../../usecases/room-message/db-update-room-message-factory'

export const makeUpdateRoomMessageController = (): UpdateRoomController => {
  return new UpdateRoomController(makeDbCanUpdateRoomMessage(), makeDbUpdateRoomMessage())
}
