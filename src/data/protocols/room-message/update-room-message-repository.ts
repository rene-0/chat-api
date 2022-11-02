export interface UpdateRoomMessageRepository {
  updateRoomMessage: (request: UpdateRoomMessageRepository.Request) => Promise<void>
}

export namespace UpdateRoomMessageRepository {
  export type Request = {
    idMessage: number
    message: string
  }
}
