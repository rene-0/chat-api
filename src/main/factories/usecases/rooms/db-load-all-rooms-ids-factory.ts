import { DbLoadAllRoomsIds } from '../../../../data/usecases/rooms/db-load-all-rooms-ids'
import { RoomsRepository } from '../../../../infra/db/sequelize/rooms-repository'

export const makeDbLoadAllRoomsIds = (): DbLoadAllRoomsIds => {
  const roomsRepository = new RoomsRepository()
  return new DbLoadAllRoomsIds(roomsRepository)
}
