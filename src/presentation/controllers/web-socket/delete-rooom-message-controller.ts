import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'
import { AccessTokenPayloadModel } from '../../../domain/models/access-token-payload-model'
import { CanDeleteRoomMessage } from '../../../domain/usecases/room-message/can-delete-room-message'
import { DeleteRoomMessage } from '../../../domain/usecases/room-message/delete-room-message'

export class DeleteRoomController implements EventController {
  constructor (
    private readonly canDeleteRoomMessage: CanDeleteRoomMessage,
    private readonly dbDeleteRoomMessage: DeleteRoomMessage
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    request?: RoomMessageController.Request
  ): Promise<HttpResponse<any>> {
    try {
      const { idRoom, idMessage } = request

      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as AccessTokenPayloadModel

      const can = await this.canDeleteRoomMessage.canDeleteRoomMessage({ idRoom, idUser, idMessage })

      if (!can.isValid) {
        return badRequest({ errorMessage: can.errorMessage })
      }

      const acknowledged = await this.dbDeleteRoomMessage.deleteRoomMessage({ idMessage })
      if (!acknowledged) {
        return badRequest({ errorMessage: ['Erro, mensagem inválida!'] })
      }
      server.in(`chat/${idRoom}`).emit('room/deleteMessage', { idMessage, message: 'Mensagem deletada' })
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RoomMessageController {
  export type Request = {
    idRoom: number
    idMessage: number
  }

  export type Response = {
    idMessage: number
    message: string
  }
}
