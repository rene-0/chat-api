import { RoomMessageModel } from '../../../domain/models/room-message-model'
import { SearchAllRoomMessages } from '../../../domain/usecases/room-message/db-search-all-room-messages'
import { noContent, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'

export class SearchAllRoomMessagesController implements Controller {
  constructor (
    private readonly dbSearchAllRoomMessages: SearchAllRoomMessages
  ) {}

  async handle (httpRequest: SearchAllRoomMessagesController.Request): Promise<HttpResponse<SearchAllRoomMessagesController.Response>> {
    try {
      const { idRoom, accessToken } = httpRequest

      const { idUser } = jwt.decode(accessToken) as { idUser: number }

      const allRooms = await this.dbSearchAllRoomMessages.searchAllRoomMessages({ idRoom, idUser })

      if (allRooms.length <= 0) {
        return noContent(new Error('Nenhuma mensagem encontrada!'))
      }

      return ok(allRooms)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SearchAllRoomMessagesController {
  export type Request = {
    idRoom: number
    accessToken: string
  }

  export type Response = RoomMessageModel[]
}
