import { DbFindAllRooms } from '../../../../data/usecases/rooms/db-find-all-rooms'
import { RoomsRepository } from '../../../../infra/db/sequelize/rooms-repository'

export const makeDbFindAllRooms = (): DbFindAllRooms => {
  const roomsRepository = new RoomsRepository()
  return new DbFindAllRooms(roomsRepository)
}
