import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { LoadAllRoomsIds } from '../../../domain/usecases/rooms/db-load-all-rooms-ids'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'

export class ConnectionController implements EventController {
  constructor (
    private readonly dbLoadAllRoomsIds: LoadAllRoomsIds
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): Promise<HttpResponse<any>> {
    try {
      const { accessToken: { token } } = socket.handshake.auth

      const { idUser } = jwt.decode(token) as { idUser: number }

      console.log('Something connected')
      const allRoomsIds = await this.dbLoadAllRoomsIds.loadAllRoomsIds()
      allRoomsIds.forEach(async (id) => {
        await socket.join(`chat/${id}`)
        await socket.join(`user/${idUser}`)
      })
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
