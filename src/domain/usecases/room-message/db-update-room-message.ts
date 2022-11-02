export interface UpdateRoomMessage {
  updateRoomMessage: (request: UpdateRoomMessage.Request) => Promise<void>
}

export namespace UpdateRoomMessage {
  export type Request = {
    idMessage: number
    message: string
  }
}
