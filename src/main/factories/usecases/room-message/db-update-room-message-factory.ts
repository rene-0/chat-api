import { DbUpdateRoomMessage } from '../../../../data/usecases/room-message/db-update-room-message'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbUpdateRoomMessage = (): DbUpdateRoomMessage => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbUpdateRoomMessage(roomMessageRepository)
}
