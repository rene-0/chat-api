import { RoomModel } from '../../../../domain/models/room-model'
import { FindAllRooms } from '../../../../domain/usecases/rooms/find-all-rooms'
import { noContent, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import jwt from 'jsonwebtoken'
import { AccessTokenPayloadModel } from '../../../../domain/models/access-token-payload-model'

export class FindAllRoomsController implements Controller {
  constructor (
    private readonly dbFindAllRooms: FindAllRooms
  ) {}

  async handle (httpRequest: FindAllRoomsController.Request): Promise<HttpResponse<FindAllRoomsController.Response>> {
    try {
      const { name, accessToken } = httpRequest

      const { idUser } = jwt.decode(accessToken) as AccessTokenPayloadModel

      const allRooms = await this.dbFindAllRooms.findAllRooms({ name, userId: idUser })

      if (allRooms.length <= 0) {
        return noContent(new Error('Nenhuma sala encontrada com o filtro atual!'))
      }

      return ok(allRooms)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindAllRoomsController {
  export type Request = {
    name?: string
    accessToken: string
  }

  type Rooms = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Rooms[]
}
