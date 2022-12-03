import { RoomModel } from '../../models/room-model'

export interface AddUserToRoom {
  addUserToRoom: (request: AddUserToRoom.Request) => Promise<AddUserToRoom.Response>
}

export namespace AddUserToRoom {
  export type Request = {
    userToBeAdded: number
    roomToAddUser: number
  }

  export type Response = RoomModel & {
    lastMessageTime: string
    lastMessage: string
  }
}
