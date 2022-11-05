import { DbDeleteRoomMessage } from '../../../../data/usecases/room-message/db-delete-room-message'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbDeleteRoomMessage = (): DbDeleteRoomMessage => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbDeleteRoomMessage(roomMessageRepository)
}
