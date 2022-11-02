import { DbRoomMessageModel } from '../../../domain/models/room-message-model'

export interface LoadRoomMessageModelRepository {
  loadRoomMessageModel: (request: LoadRoomMessageModelRepository.Request) => Promise<LoadRoomMessageModelRepository.Response>
}

export namespace LoadRoomMessageModelRepository {
  export type Request = {
    idMessage: number
  }

  export type Response = DbRoomMessageModel
}
