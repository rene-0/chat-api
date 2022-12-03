import { DbAddUserToRoom } from '../../../../data/usecases/rooms/db-add-user-to-room'
import { RoomsRepository } from '../../../../infra/db/sequelize/rooms-repository'

export const makeDbAddUserToRoom = (): DbAddUserToRoom => {
  const roomRepository = new RoomsRepository()
  return new DbAddUserToRoom(roomRepository, roomRepository)
}
