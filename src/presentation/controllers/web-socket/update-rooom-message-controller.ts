import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { UserModel } from '../../../domain/models/user-model'
import { CanUpdateRoomMessage } from '../../../domain/usecases/room-message/can-update-room-message'
import { UpdateRoomMessage } from '../../../domain/usecases/room-message/db-update-room-message'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'

export class UpdateRoomController implements EventController {
  constructor (
    private readonly canUpdateRoomMessage: CanUpdateRoomMessage,
    private readonly dbUpdateRoomMessage: UpdateRoomMessage
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    request?: RoomMessageController.Request
  ): Promise<HttpResponse<any>> {
    try {
      const { idRoom, message, idMessage } = request

      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as Omit<UserModel, 'password' | 'lastConnected'>

      const can = await this.canUpdateRoomMessage.canUpdateRoomMessage({ idRoom, idUser, idMessage })

      if (!can.isValid) {
        return badRequest({ errorMessage: can.errorMessage })
      }

      await this.dbUpdateRoomMessage.updateRoomMessage({ message, idMessage })
      server.in(`chat/${idRoom}`).emit('room/updateMessage', { idMessage, message })
      return ok({})
    } catch (error) {
      console.log('error', error)
      return serverError(error)
    }
  }
}

export namespace RoomMessageController {
  export type Request = {
    idRoom: number
    idMessage: number
    message: string
  }

  export type RoomMessage = {
    idMessage: number
    message: string
  }
}
