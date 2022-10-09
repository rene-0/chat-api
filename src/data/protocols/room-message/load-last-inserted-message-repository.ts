export interface LoadLastInsertedRoomMessageRepository {
  loadLastRoomMessage: (request: LoadLastInsertedRoomMessageRepository.Request) => Promise<LoadLastInsertedRoomMessageRepository.Response>
}

export namespace LoadLastInsertedRoomMessageRepository {
  export type Request = {
    idRoomMessage: number
  }

  export type Response = {
    idRoomMessage: number
    user: string
    message: string
    time: string
    deleted: 'S' | 'N'
    edited: 'S' | 'N'
  }
}
