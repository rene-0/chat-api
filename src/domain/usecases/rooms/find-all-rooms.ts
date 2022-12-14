import { RoomModel } from '../../models/room-model'

export interface FindAllRooms {
  findAllRooms: (request: FindAllRooms.Request) => Promise<FindAllRooms.Response>
}

export namespace FindAllRooms {
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
