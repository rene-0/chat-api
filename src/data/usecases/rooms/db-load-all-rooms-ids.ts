import { LoadAllRoomsIds } from '../../../domain/usecases/rooms/db-load-all-rooms-ids'
import { LoadAllRoomsIdsRepository } from '../../protocols/rooms/load-all-rooms-ids-repository'

export class DbLoadAllRoomsIds implements LoadAllRoomsIds {
  constructor (
    private readonly roomsRepository: LoadAllRoomsIdsRepository
  ) {}

  async loadAllRoomsIds (): Promise<LoadAllRoomsIds.Response> {
    const roomsIds = await this.roomsRepository.loadAllRoomsIds()
    const ids = roomsIds.map(({ idRoom }) => idRoom)
    return ids
  }
}
