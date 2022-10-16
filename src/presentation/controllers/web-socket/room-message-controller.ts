import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { WriteRoomMessage } from '../../../domain/usecases/room-message/db-write-room-message'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../../domain/models/user-model'

export class RoomMessageController implements EventController {
  constructor (
    private readonly dbWriteRoomMessage: WriteRoomMessage
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    request?: RoomMessageController.Request
  ): Promise<HttpResponse<any>> {
    try {
      const { message, chatRoom } = request

      const { accessToken: { token } } = socket.handshake.auth

      const { idUser, email } = jwt.decode(token) as Omit<UserModel, 'password' | 'lastConnected'>

      const lastInsertedRoomMessage = await this.dbWriteRoomMessage.writeRoomMessage({ idRoom: chatRoom, idUser, message })

      const receiverRoomMessage: RoomMessageController.RoomMessage = {
        ...lastInsertedRoomMessage,
        idMessage: lastInsertedRoomMessage.idRoomMessage,
        sender: email
      }
      // server.in PARA TODOS INCLUINDO QUEM ENVIOU
      server.in(`chat/${chatRoom}`).emit('room/message', receiverRoomMessage)
      return ok({})
    } catch (error) {
      console.log('error', error)
      return serverError(error)
    }
  }
}

export namespace RoomMessageController {
  export type Request = {
    chatRoom: number
    message: string
  }

  export type RoomMessage = {
    idMessage: number
    user: string
    time: string
    message: string
    sender: string
  }

  export type ReceiverRoomMessage = {
    idMessage: number
    user: string
    time: string
    message: string
    you: false
  }
}
