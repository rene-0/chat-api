import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { LoadAllRoomsIds } from '../../../domain/usecases/rooms/db-load-all-rooms-ids'
import { ok, serverError } from '../../helpers/http-helper'
import { EventController } from '../../protocols/avent-controller'
import { HttpResponse } from '../../protocols/http'

export class ConnectionController implements EventController {
  constructor (
    private readonly dbLoadAllRoomsIds: LoadAllRoomsIds
  ) {}

  async handle (
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): Promise<HttpResponse<any>> {
    try {
      console.log('Something connected')
      const allRoomsIds = await this.dbLoadAllRoomsIds.loadAllRoomsIds()
      allRoomsIds.forEach(async (id) => {
        await socket.join(`chat/${id}`)
      })
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
