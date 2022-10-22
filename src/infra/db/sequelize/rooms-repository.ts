import { QueryTypes } from 'sequelize'
import { FindAllRoomsRepository } from '../../../data/protocols/rooms/find-all-rooms-repository'
import { LoadAllRoomsIdsRepository } from '../../../data/protocols/rooms/load-all-rooms-ids-repository'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class RoomsRepository implements FindAllRoomsRepository, LoadAllRoomsIdsRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async loadAllRoomsIds (): Promise<LoadAllRoomsIdsRepository.Response> {
    const sql = 'SELECT id_room idRoom FROM rooms'

    const roomsIds = await this.sequelize.client.query<LoadAllRoomsIdsRepository.Response[0]>(sql, { type: QueryTypes.SELECT })
    return roomsIds
  }

  async findAllRooms (request: FindAllRoomsRepository.Request): Promise<FindAllRoomsRepository.Response> {
    const { name } = request

    let where = ''
    if (name) {
      where += ' WHERE name LIKE :name'
    }

    const replacements = {
      ...(name ? { name: `%${name}%` } : {})
    }

    const sql = `
      SELECT r.id_room idRoom,
      name,
      (SELECT max(date_time) FROM room_messages WHERE id_room = idRoom) lastMessageTime,
      (SELECT message FROM room_messages WHERE id_room = idRoom ORDER BY date_time desc LIMIT 1) lastMessage
      FROM rooms r
      ${where}
    `

    const allRooms = await this.sequelize.client.query<FindAllRoomsRepository.Response[0]>(sql, { type: QueryTypes.SELECT, replacements })

    return allRooms
  }
}
