export interface WriteRoomMessageRepository {
  writeRoomMessage: (request: WriteRoomMessageRepository.Request) => Promise<WriteRoomMessageRepository.Response>
}

export namespace WriteRoomMessageRepository {
  export type Request = {
    idRoom: number
    idUser: number
    message: string
  }

  export type Response = number
}
