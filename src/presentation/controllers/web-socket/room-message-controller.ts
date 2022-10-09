import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { WriteRoomMessage } from '../../../domain/usecases/room-message/db-write-room-message'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'

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
      console.log('request', request)
      const { message, chatRoom } = request

      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as { idUser: number }

      const lastInsertedRoomMessage = await this.dbWriteRoomMessage.writeRoomMessage({ idRoom: chatRoom, idUser, message })
      console.log('lastInsertedRoomMessage', lastInsertedRoomMessage)
      const senderRoomMessage: RoomMessageController.SenderRoomMessage = {
        ...lastInsertedRoomMessage,
        idMessage: lastInsertedRoomMessage.idRoomMessage,
        you: true
      }
      socket.to(`chat/${chatRoom}`).emit('room/message', senderRoomMessage)
      const receiverRoomMessage: RoomMessageController.ReceiverRoomMessage = {
        ...lastInsertedRoomMessage,
        idMessage: lastInsertedRoomMessage.idRoomMessage,
        you: false
      }
      server.to(`chat/${chatRoom}`).emit('room/message', receiverRoomMessage)
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

  export type SenderRoomMessage = {
    idMessage: number
    user: string
    time: string
    message: string
    you: true
  }

  export type ReceiverRoomMessage = {
    idMessage: number
    user: string
    time: string
    message: string
    you: false
  }
}
