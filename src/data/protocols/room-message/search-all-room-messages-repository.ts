import { RoomMessageModel } from '../../../domain/models/room-message-model'

export interface SearchAllRoomMessagesRepository {
  searchAllRoomMessages: (request: SearchAllRoomMessagesRepository.Request) => Promise<SearchAllRoomMessagesRepository.Response>
}

export namespace SearchAllRoomMessagesRepository {
  export type Request = {
    idRoom: number
    idUser: number
  }

  type RoomMessage = Omit<RoomMessageModel, 'deleted' | 'edited'> & {
    deleted: 'Y' | 'N'
    edited: 'Y' | 'N'
  }

  export type Response = RoomMessage[]
}
