import { RoomMessageModel } from '../../models/room-message-model'

export interface SearchAllRoomMessages {
  searchAllRoomMessages: (request: SearchAllRoomMessages.Request) => Promise<SearchAllRoomMessages.Response>
}

export namespace SearchAllRoomMessages {
  export type Request = {
    idRoom: number
    idUser: number
  }

  export type Response = RoomMessageModel[]
}
