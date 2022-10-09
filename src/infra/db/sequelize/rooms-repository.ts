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

    let having = ''
    if (name) {
      having += ' HAVING name LIKE :name'
    }

    const replacements = {
      ...(name ? { name: `%${name}%` } : {})
    }

    const sql = `
      SELECT DISTINCT r.id_room idRoom, name, max(date_time) lastMessageTime, message lastMessage
      FROM rooms r
      INNER JOIN room_messages rm ON (r.id_room = rm.id_room)
      GROUP BY r.id_room
      ${having}
      ORDER BY date_time desc    
    `

    const allRooms = await this.sequelize.client.query<FindAllRoomsRepository.Response[0]>(sql, { type: QueryTypes.SELECT, replacements })

    return allRooms
  }
}
