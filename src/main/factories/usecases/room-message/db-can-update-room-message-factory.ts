import { DbCanUpdateRoomMessage } from '../../../../data/usecases/room-message/db-can-update-room-message'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbCanUpdateRoomMessage = (): DbCanUpdateRoomMessage => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbCanUpdateRoomMessage(roomMessageRepository)
}
