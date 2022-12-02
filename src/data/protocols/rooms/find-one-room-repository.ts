import { RoomModel } from '../../../domain/models/room-model'

export interface FindOneRoomRepository {
  findOneRoom: (request: FindOneRoomRepository.Request) => Promise<FindOneRoomRepository.Response>
}

export namespace FindOneRoomRepository {
  export type Request = {
    roomId: number
  }

  export type Response = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }
}
