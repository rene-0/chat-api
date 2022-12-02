import { FindUsersToAddToRoom } from '../../../../domain/usecases/users/users-to-add-to-room'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'

export class FindUsersToAddToRoomController implements Controller {
  constructor (
    private readonly dbFindUsersToAddToRoom: FindUsersToAddToRoom
  ) {}

  async handle (request: FindAllRoomsController.Request): Promise<HttpResponse<any>> {
    try {
      const { roomId } = request

      const usersToAdd = await this.dbFindUsersToAddToRoom.findUsersToAddToRoom({ roomId })

      return ok(usersToAdd)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace FindAllRoomsController {
  export type Request = {
    roomId: number
  }

  type User = {
    idUser: number
    name: string
  }

  export type Response = User[]
}
