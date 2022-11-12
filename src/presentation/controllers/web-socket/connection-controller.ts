import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { LoadAllJoinedRoomsIds } from '../../../domain/usecases/rooms/load-all-joined-rooms-ids'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'
import { AccessTokenPayloadModel } from '../../../domain/models/access-token-payload-model'

export class ConnectionController implements EventController {
  constructor (
    private readonly dbLoadAllRoomsIds: LoadAllJoinedRoomsIds
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): Promise<HttpResponse<any>> {
    try {
      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as AccessTokenPayloadModel

      console.log('Something connected')
      const allJoinedRoomsIds = await this.dbLoadAllRoomsIds.loadAllJoinedRoomsIds({ userId: idUser })
      await socket.join(`user/${idUser}`)
      allJoinedRoomsIds.forEach(async (id) => {
        await socket.join(`chat/${id}`)
      })
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
