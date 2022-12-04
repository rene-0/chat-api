import { RoomModel } from '../../../domain/models/room-model'
import { ok, serverError } from '../../helpers/http-helper'
import { HttpResponse } from '../../protocols/http'
import { AddUserToRoom } from '../../../domain/usecases/rooms/add-user-to-room'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { EventController } from '../../protocols/avent-controller'

export class AddUserToRoomController implements EventController {
  constructor(private readonly dbAddUserToRoomController: AddUserToRoom) {}

  async handle(
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    request: FindAllRoomsController.Request
  ): Promise<HttpResponse<any>> {
    try {
      const { usersToBeAdded, roomToAddUser } = request

      // Validar
      // const { idUser } = jwt.decode(accessToken) as AccessTokenPayloadModel

      const room = await this.dbAddUserToRoomController.addUserToRoom({ roomToAddUser, usersToBeAdded })

      usersToBeAdded.forEach(async (user) => {
        server.in(`user/${user}`).emit('room/new', room)
        const sockets = await server.in(`user/${user}`).fetchSockets()
        sockets.forEach((socket) => {
          socket.join(`chat/${roomToAddUser}`)
        })
      })

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindAllRoomsController {
  export type Request = {
    usersToBeAdded: number[]
    roomToAddUser: number
    accessToken: string
  }

  type Rooms = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Rooms[]
}
