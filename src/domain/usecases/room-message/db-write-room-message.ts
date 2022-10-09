export interface WriteRoomMessage {
  writeRoomMessage: (request: WriteRoomMessage.Request) => Promise<WriteRoomMessage.Response>
}

export namespace WriteRoomMessage {
  export type Request = {
    idRoom: number
    idUser: number
    message: string
  }

  export type Response = {
    idRoomMessage: number
    user: string
    message: string
    time: string
    deleted: boolean
    edited: boolean
  }
}
