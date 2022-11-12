import Transaction from 'sequelize/types/transaction'
import { RoomModel } from '../../models/room-model'

export interface FindRoomRepository {
  findRoom: (request: FindRoomRepository.Request, transaction: Transaction) => Promise<FindRoomRepository.Response>
}

export namespace FindRoomRepository {
  export type Request = {
    idRoom: number
  }

  type Rooms = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Rooms
}
