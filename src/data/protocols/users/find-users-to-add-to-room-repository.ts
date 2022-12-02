export interface FindUsersToAddToRoomRepository {
  findUsersToAddToRoom: (request: FindUsersToAddToRoomRepository.Request) => Promise<FindUsersToAddToRoomRepository.Response>
}

export namespace FindUsersToAddToRoomRepository {
  export type Request = {
    roomId: number
  }

  type User = {
    idUser: number
    name: string
  }

  export type Response = User[]
}
