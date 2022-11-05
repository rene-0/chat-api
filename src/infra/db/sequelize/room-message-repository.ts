import { QueryTypes } from 'sequelize'
import { DeleteRoomMessageRepository } from '../../../data/protocols/room-message/delete-room-message-repository'
import { LoadLastInsertedRoomMessageRepository } from '../../../data/protocols/room-message/load-last-inserted-message-repository'
import { LoadRoomMessageModelRepository } from '../../../data/protocols/room-message/load-room-message-repository'
import { SearchAllRoomMessagesRepository } from '../../../data/protocols/room-message/search-all-room-messages-repository'
import { UpdateRoomMessageRepository } from '../../../data/protocols/room-message/update-room-message-repository'
import { WriteRoomMessageRepository } from '../../../data/protocols/room-message/write-room-message-repository'
import { DbRoomMessageModel } from '../../../domain/models/room-message-model'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class RoomMessageRepository implements
  WriteRoomMessageRepository,
  LoadLastInsertedRoomMessageRepository,
  SearchAllRoomMessagesRepository,
  UpdateRoomMessageRepository,
  LoadRoomMessageModelRepository,
  DeleteRoomMessageRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async deleteRoomMessage (request: DeleteRoomMessageRepository.Request): Promise<boolean> {
    const { idRoomMessage } = request
    const sql = "UPDATE room_messages SET deleted = 'Y' WHERE id_room_message = :idRoomMessage"

    const replacements = {
      idRoomMessage
    }

    const updateResult = await this.sequelize.client.query(sql, { replacements, type: QueryTypes.UPDATE })

    return updateResult[1] > 0
  }

  async loadRoomMessageModel (request: LoadRoomMessageModelRepository.Request): Promise<DbRoomMessageModel> {
    const { idMessage } = request
    const sql = 'SELECT * FROM room_messages WHERE id_room_message = :idMessage LIMIT 1'

    const replacements = {
      idMessage
    }

    const [roomMessage] = await this.sequelize.client.query<DbRoomMessageModel>(sql, { replacements, type: QueryTypes.SELECT })

    return roomMessage
  }

  async updateRoomMessage (request: UpdateRoomMessageRepository.Request): Promise<void> {
    const { message, idMessage } = request
    console.log('idMessage', idMessage)

    const sql = "UPDATE room_messages SET message = :message, edited = 'Y' WHERE id_room_message = :idMessage"

    const replacements = {
      message,
      idMessage
    }

    await this.sequelize.client.query(sql, { replacements, type: QueryTypes.UPDATE })
  }

  async loadLastRoomMessage (request: LoadLastInsertedRoomMessageRepository.Request): Promise<LoadLastInsertedRoomMessageRepository.Response> {
    const { idRoomMessage } = request
    const sql = `
      SELECT rm.id_room_message idRoomMessage, u.name user, rm.message message, rm.date_time time, rm.deleted deleted, rm.edited edited
      FROM room_messages rm
      INNER JOIN users u ON (rm.id_user = u.id_user)
      WHERE id_room_message = :idRoomMessage
    `

    const replacements = {
      idRoomMessage
    }

    const [roomMessage] = await this.sequelize.client.query<LoadLastInsertedRoomMessageRepository.Response>(sql, { replacements, type: QueryTypes.SELECT })

    return roomMessage
  }

  async writeRoomMessage (request: WriteRoomMessageRepository.Request): Promise<WriteRoomMessageRepository.Response> {
    const { idRoom, idUser, message } = request
    const sql = 'INSERT INTO room_messages (id_room, id_user, message) VALUES (:idRoom, :idUser, :message)'

    const last = 'SELECT LAST_INSERT_ID() lastInsertedId'

    const replacements = {
      idRoom,
      idUser,
      message
    }

    await this.sequelize.client.query(sql, { replacements, type: QueryTypes.INSERT })
    const [{ lastInsertedId }] = await this.sequelize.client.query<any>(last, { type: QueryTypes.SELECT })

    return lastInsertedId
  }

  async searchAllRoomMessages (request: SearchAllRoomMessagesRepository.Request): Promise<SearchAllRoomMessagesRepository.Response> {
    const { idRoom, idUser } = request
    const sql = `
      SELECT
        id_room_message idRoomMessage,
          name user,
          CASE
          WHEN deleted = 'Y' THEN 'Mensagem deletada'
              ELSE message
        END message,
          date_time time,
          deleted,
          edited,
        email sender
      FROM room_messages rm
      INNER JOIN users u ON (u.id_user = rm.id_user)
      WHERE id_room = :idRoom
      ORDER BY date_time ASC
    `

    const replacements = {
      idRoom,
      idUser
    }

    const roomMessages = await this.sequelize.client.query<any>(sql, { type: QueryTypes.SELECT, replacements })

    return roomMessages
  }
}
