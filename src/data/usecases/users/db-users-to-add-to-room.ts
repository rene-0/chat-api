import { FindUsersToAddToRoom } from '../../../domain/usecases/users/users-to-add-to-room'
import { FindUsersToAddToRoomRepository } from '../../protocols/users/find-users-to-add-to-room-repository'

export class DbFindUsersToAddToRoom implements FindUsersToAddToRoom {
  constructor (
    private readonly findUsersToAddToRoomRepository: FindUsersToAddToRoomRepository
  ) {}

  async findUsersToAddToRoom (request: FindUsersToAddToRoom.Request): Promise<FindUsersToAddToRoom.Response> {
    const { roomId } = request
    const users = await this.findUsersToAddToRoomRepository.findUsersToAddToRoom({ roomId })
    return users
  }
}
