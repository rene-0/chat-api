import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'
import { CreateRoom } from '../../../domain/usecases/rooms/db-create-room'
import { RoomModel } from '../../../domain/models/room-model'
import { AccessTokenPayloadModel } from '../../../domain/models/access-token-payload-model'
import { SequelizeHelper } from '../../../infra/helper/sequelize-helper'

export class CreateRoomController implements EventController {
  constructor (
    private readonly dbCreateRoom: CreateRoom
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    request: RoomMessageController.Request
  ): Promise<HttpResponse<any>> {
    try {
      const { roomName } = request

      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as AccessTokenPayloadModel

      const transaction = await SequelizeHelper.client.transaction()

      const createdRoom = await this.dbCreateRoom.createRoom({ idUser, roomName }, transaction)

      server.in(`user/${idUser}`).emit('room/new', createdRoom)
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RoomMessageController {
  export type Request = {
    roomName: string
  }

  type Room = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Room
}
