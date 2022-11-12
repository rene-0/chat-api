import { RoomModel } from '../../../domain/models/room-model'

export interface FindAllRoomsRepository {
  findAllRooms: (request: FindAllRoomsRepository.Request) => Promise<FindAllRoomsRepository.Response>
}

export namespace FindAllRoomsRepository {
  export type Request = {
    userId: number
    name?: string
  }

  type Rooms = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Rooms[]
}
