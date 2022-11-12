import { DbCreateRoom } from '../../../../data/usecases/rooms/db-create-room'
import { RoomsRepository } from '../../../../infra/db/sequelize/rooms-repository'

export const makeDbCreateRoom = (): DbCreateRoom => {
  const roomsRepository = new RoomsRepository()
  return new DbCreateRoom(roomsRepository, roomsRepository, roomsRepository)
}
