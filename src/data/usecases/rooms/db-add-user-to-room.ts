import { AddUserToRoom } from '../../../domain/usecases/rooms/add-user-to-room'
import { AddUserToRoomRepository } from '../../protocols/rooms/add-user-to-room-repository'
import { FindOneRoomRepository } from '../../protocols/rooms/find-one-room-repository'

export class DbAddUserToRoom implements AddUserToRoom {
  constructor (
    private readonly addUserToRoomRepository: AddUserToRoomRepository,
    private readonly findOneRoomRepository: FindOneRoomRepository
  ) {}

  async addUserToRoom (request: AddUserToRoom.Request): Promise<AddUserToRoom.Response> {
    const { roomToAddUser, userToBeAdded } = request
    const acknowledge = await this.addUserToRoomRepository.addUserToRoom({ roomToAddUser, userToBeAdded })
    console.log('acknowledge', acknowledge)
    if (!acknowledge) {
      return
    }
    console.log('roomToAddUser', roomToAddUser)
    const room = await this.findOneRoomRepository.findOneRoom({ roomId: roomToAddUser })
    return room
  }
}
