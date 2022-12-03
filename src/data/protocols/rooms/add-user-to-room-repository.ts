export interface AddUserToRoomRepository {
  addUserToRoom: (request: AddUserToRoomRepository.Request) => Promise<AddUserToRoomRepository.Response>
}

export namespace AddUserToRoomRepository {
  export type Request = {
    userToBeAdded: number
    roomToAddUser: number
  }

  export type Response = boolean
}
