import { ValidationErrorModel } from '../../models/validation-error-model'

export interface CanUpdateRoomMessage {
  canUpdateRoomMessage: (request: CanUpdateRoomMessage.Request) => Promise<CanUpdateRoomMessage.Response>
}

export namespace CanUpdateRoomMessage {
  export type Request = {
    idRoom: number
    idMessage: number
    idUser: number
  }

  export type Response = ValidationErrorModel
}
