import { LoadAllJoinedRoomsIds } from '../../../domain/usecases/rooms/load-all-joined-rooms-ids'
import { LoadAllJoinedRoomsIdsRepository } from '../../protocols/rooms/load-all-joined-rooms-ids-repository'

export class DbLoadAllRoomsIds implements LoadAllJoinedRoomsIds {
  constructor (
    private readonly roomsRepository: LoadAllJoinedRoomsIdsRepository
  ) {}

  async loadAllJoinedRoomsIds (request: LoadAllJoinedRoomsIds.Request): Promise<LoadAllJoinedRoomsIds.Response> {
    const { userId } = request
    const roomsIds = await this.roomsRepository.loadAllJoinedRoomsIds({ userId })
    const ids = roomsIds.map(({ roomId }) => roomId)
    return ids
  }
}
