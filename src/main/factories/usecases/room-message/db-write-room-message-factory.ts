import { DbWriteRoomMessage } from '../../../../data/usecases/room-message/db-write-room-message'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbWriteRoomMessage = (): DbWriteRoomMessage => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbWriteRoomMessage(roomMessageRepository, roomMessageRepository)
}
