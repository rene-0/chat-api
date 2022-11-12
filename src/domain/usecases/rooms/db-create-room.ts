import { Transaction } from 'sequelize/types'
import { RoomModel } from '../../models/room-model'

export interface CreateRoom {
  createRoom: (request: CreateRoom.Request, transaction: Transaction) => Promise<CreateRoom.Response>
}

export namespace CreateRoom {
  export type Request = {
    idUser: number
    roomName: string
  }

  type Rooms = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }

  export type Response = Rooms
}
