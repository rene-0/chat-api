import Transaction from 'sequelize/types/transaction'
import { CreateRoom } from '../../../domain/usecases/rooms/db-create-room'
import { FindRoomRepository } from '../../../domain/usecases/rooms/db-find-room'
import { AddUserAdminToRoomRepository } from '../../protocols/rooms/add-user-admin-to-room-repository'
import { CreateRoomRepository } from '../../protocols/rooms/create-room-repository'

export class DbCreateRoom implements CreateRoom {
  constructor (
    private readonly createRoomRepository: CreateRoomRepository,
    private readonly addUserAdminToRoomRepository: AddUserAdminToRoomRepository,
    private readonly findRoomRepository: FindRoomRepository
  ) {}

  async createRoom (request: CreateRoom.Request, transaction: Transaction): Promise<CreateRoom.Response> {
    const { idUser, roomName } = request

    try {
      const createdRoomId = await this.createRoomRepository.createRoom({ roomName }, transaction)
      const isUserInserted = await this.addUserAdminToRoomRepository.addUserAdminToRoom({ idRoom: createdRoomId, idUser }, transaction)
      const createdRoom = await this.findRoomRepository.findRoom({ idRoom: createdRoomId }, transaction)

      if (isUserInserted && createdRoom) {
        await transaction.commit()
        return createdRoom
      }

      throw new Error('Falha ao criar sala!')
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
