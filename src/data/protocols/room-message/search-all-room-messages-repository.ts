import { RoomMessageModel } from '../../../domain/models/room-message-model'

export interface SearchAllRoomMessagesRepository {
  searchAllRoomMessages: (request: SearchAllRoomMessagesRepository.Request) => Promise<SearchAllRoomMessagesRepository.Response>
}

export namespace SearchAllRoomMessagesRepository {
  export type Request = {
    idRoom: number
    idUser: number
  }

  type RoomMessage = Omit<RoomMessageModel, 'deleted' | 'edited' | 'you'> & {
    you: 'S' | 'N'
    deleted: 'S' | 'N'
    edited: 'S' | 'N'
  }

  export type Response = RoomMessage[]
}
