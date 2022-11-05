export interface DeleteRoomMessage {
  deleteRoomMessage: (request: DeleteRoomMessage.Request) => Promise<DeleteRoomMessage.Response>
}

export namespace DeleteRoomMessage {
  export type Request = {
    idMessage: number
  }

  export type Response = boolean
}
