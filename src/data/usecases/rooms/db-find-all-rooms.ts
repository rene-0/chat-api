import { FindAllRooms } from '../../../domain/usecases/rooms/find-all-rooms'
import { FindAllRoomsRepository } from '../../protocols/rooms/find-all-rooms-repository'

export class DbFindAllRooms implements FindAllRooms {
  constructor (
    private readonly roomsRepository: FindAllRoomsRepository
  ) {}

  async findAllRooms (request: FindAllRooms.Request): Promise<FindAllRooms.Response> {
    const allRoms = await this.roomsRepository.findAllRooms(request)
    return allRoms
  }
}
