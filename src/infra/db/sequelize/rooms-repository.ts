import { QueryTypes, Transaction } from 'sequelize'
import { AddUserAdminToRoomRepository } from '../../../data/protocols/rooms/add-user-admin-to-room-repository'
import { CreateRoomRepository } from '../../../data/protocols/rooms/create-room-repository'
import { FindAllRoomsRepository } from '../../../data/protocols/rooms/find-all-rooms-repository'
import { LoadAllJoinedRoomsIdsRepository } from '../../../data/protocols/rooms/load-all-joined-rooms-ids-repository'
import { FindRoomRepository } from '../../../domain/usecases/rooms/db-find-room'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class RoomsRepository implements
  FindAllRoomsRepository,
  LoadAllJoinedRoomsIdsRepository,
  CreateRoomRepository,
  AddUserAdminToRoomRepository,
  FindRoomRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async findRoom (request: FindRoomRepository.Request, transaction: Transaction): Promise<FindRoomRepository.Response> {
    const { idRoom } = request

    const sql = `
      SELECT r.id_room idRoom,
      name,
      (SELECT max(date_time) FROM room_messages WHERE id_room = idRoom) lastMessageTime,
      (SELECT message FROM room_messages WHERE id_room = idRoom ORDER BY date_time desc LIMIT 1) lastMessage
      FROM rooms r
      WHERE r.id_room = :idRoom
    `

    const replacements = {
      idRoom
    }

    const [room] = await this.sequelize.client.query<FindRoomRepository.Response>(sql, { replacements, type: QueryTypes.SELECT, transaction })

    return room
  }

  async addUserAdminToRoom (request: AddUserAdminToRoomRepository.Request, transaction: Transaction): Promise<boolean> {
    const { idRoom, idUser } = request
    const sql = "INSERT INTO room_users (id_user, id_room, admin) VALUES (:idUser, :idRoom, 'Y')"

    const replacements = {
      idRoom,
      idUser
    }

    const insertedUserInRoomId = await this.sequelize.client.query(sql, { replacements, type: QueryTypes.INSERT, transaction })

    return insertedUserInRoomId[0] > 0
  }

  async createRoom (request: CreateRoomRepository.Request, transaction: Transaction): Promise<CreateRoomRepository.Response> {
    const { roomName } = request
    const sql = 'INSERT INTO rooms (name) VALUES (:roomName)'

    const replacements = {
      roomName
    }

    const [createdRoomId] = await this.sequelize.client.query(sql, { replacements, type: QueryTypes.INSERT, transaction })
    return createdRoomId
  }

  async loadAllJoinedRoomsIds (request: LoadAllJoinedRoomsIdsRepository.Request): Promise<LoadAllJoinedRoomsIdsRepository.Response> {
    const { userId } = request
    const sql = 'SELECT id_room roomId FROM room_users WHERE id_user = :userId'

    const replacements = {
      userId
    }

    const roomsIds = await this.sequelize.client.query<LoadAllJoinedRoomsIdsRepository.Response[0]>(sql, { type: QueryTypes.SELECT, replacements })
    return roomsIds
  }

  async findAllRooms (request: FindAllRoomsRepository.Request): Promise<FindAllRoomsRepository.Response> {
    const { name, userId } = request

    let where = 'WHERE id_user = :userId'
    if (name) {
      where += ' AND name LIKE :name'
    }

    const replacements = {
      ...(name ? { name: `%${name}%` } : {}),
      userId
    }

    const sql = `
      SELECT r.id_room idRoom,
      name,
      (SELECT max(date_time) FROM room_messages WHERE id_room = idRoom) lastMessageTime,
      (SELECT message FROM room_messages WHERE id_room = idRoom ORDER BY date_time desc LIMIT 1) lastMessage
      FROM rooms r
      INNER JOIN room_users rm ON (r.id_room = rm.id_room)
      ${where}
    `

    const allRooms = await this.sequelize.client.query<FindAllRoomsRepository.Response[0]>(sql, { type: QueryTypes.SELECT, replacements })

    return allRooms
  }
}
