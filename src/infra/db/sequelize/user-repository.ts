import QueryTypes from 'sequelize/types/query-types'
import { FindUsersToAddToRoomRepository } from '../../../data/protocols/users/find-users-to-add-to-room-repository'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class UserRepository implements FindUsersToAddToRoomRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async findUsersToAddToRoom (request: FindUsersToAddToRoomRepository.Request): Promise<FindUsersToAddToRoomRepository.Response> {
    const { roomId } = request

    const sql = `
      SELECT id_user idUser, name FROM users
      WHERE id_user NOT IN (
        SELECT id_user FROM room_users WHERE id_room = :roomId
      )
    `

    const replacements = {
      roomId
    }

    const users = await this.sequelize.client.query<FindUsersToAddToRoomRepository.Response[0]>(sql, { replacements, type: QueryTypes.SELECT })
    return users
  }
}
