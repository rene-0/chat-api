export interface DeleteRoomMessageRepository {
  deleteRoomMessage: (request: DeleteRoomMessageRepository.Request) => Promise<DeleteRoomMessageRepository.Response>
}

export namespace DeleteRoomMessageRepository {
  export type Request = {
    idRoomMessage: number
  }

  export type Response = boolean
}
