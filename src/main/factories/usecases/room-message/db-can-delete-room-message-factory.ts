import { DbCanDeleteRoomMessage } from '../../../../data/usecases/room-message/db-can-delete-room-message'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbCanDeleteRoomMessage = (): DbCanDeleteRoomMessage => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbCanDeleteRoomMessage(roomMessageRepository)
}
