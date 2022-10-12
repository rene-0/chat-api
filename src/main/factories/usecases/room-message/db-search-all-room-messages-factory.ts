import { DbSearchAllRoomMessages } from '../../../../data/usecases/room-message/db-search-all-room-messages'
import { RoomMessageRepository } from '../../../../infra/db/sequelize/room-message-repository'

export const makeDbSearchAllRoomMessages = (): DbSearchAllRoomMessages => {
  const roomMessageRepository = new RoomMessageRepository()
  return new DbSearchAllRoomMessages(roomMessageRepository)
}
