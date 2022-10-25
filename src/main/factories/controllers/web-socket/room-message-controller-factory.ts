import { RoomMessageController } from '../../../../presentation/controllers/web-socket/write-room-message-controller'
import { makeDbWriteRoomMessage } from '../../usecases/room-message/db-write-room-message-factory'

export const makeRoomMessageController = (): RoomMessageController => {
  return new RoomMessageController(makeDbWriteRoomMessage())
}
