import { ValidationErrorModel } from '../../models/validation-error-model'

export interface CanDeleteRoomMessage {
  canDeleteRoomMessage: (request: CanDeleteRoomMessage.Request) => Promise<CanDeleteRoomMessage.Response>
}

export namespace CanDeleteRoomMessage {
  export type Request = {
    idRoom: number
    idMessage: number
    idUser: number
  }

  export type Response = ValidationErrorModel
}
