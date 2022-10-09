import { QueryTypes } from 'sequelize'
import { LoadLastInsertedRoomMessageRepository } from '../../../data/protocols/room-message/load-last-inserted-message-repository'
import { WriteRoomMessageRepository } from '../../../data/protocols/room-message/write-room-message-repository'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class RoomMessageRepository implements WriteRoomMessageRepository, LoadLastInsertedRoomMessageRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async loadLastRoomMessage (request: LoadLastInsertedRoomMessageRepository.Request): Promise<LoadLastInsertedRoomMessageRepository.Response> {
    const { idRoomMessage } = request
    const sql = `
      SELECT rm.id_room_messages idRoomMessage, u.name user, rm.message message, rm.date_time time, rm.deleted deleted, rm.edited edited
      FROM room_messages rm
      INNER JOIN users u ON (rm.id_user = u.id_user)
      WHERE id_room_messages = :idRoomMessage
    `

    const replacements = {
      idRoomMessage
    }

    const [roomMessage] = await this.sequelize.client.query<LoadLastInsertedRoomMessageRepository.Response>(sql, { replacements, type: QueryTypes.SELECT })

    return roomMessage
  }

  async writeRoomMessage (request: WriteRoomMessageRepository.Request): Promise<WriteRoomMessageRepository.Response> {
    const { idRoom, idUser, message } = request
    // const sql = `
    //   INSERT INTO room_messages (id_room, id_user, message) VALUES (:idRoom, :idUser, :message);
    //   SELECT LAST_INSERT_ID() lastInsertedId;
    // `
    const sql = `
      INSERT INTO room_messages (id_room, id_user, message) VALUES (:idRoom, :idUser, :message);
    `

    const last = 'SELECT LAST_INSERT_ID() lastInsertedId;'

    const replacements = {
      idRoom,
      idUser,
      message
    }

    await this.sequelize.client.query<any>(sql, { replacements, type: QueryTypes.INSERT })
    const [{ lastInsertedId }] = await this.sequelize.client.query<any>(last, { type: QueryTypes.SELECT })

    return lastInsertedId
  }
}
