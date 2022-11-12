import { RoomModel } from '../../../domain/models/room-model'

export interface LoadAllJoinedRoomsIdsRepository {
  loadAllJoinedRoomsIds: (request: LoadAllJoinedRoomsIdsRepository.Request) => Promise<LoadAllJoinedRoomsIdsRepository.Response>
}

export namespace LoadAllJoinedRoomsIdsRepository {
  export type Request = {
    userId: number
  }

  export type Response = Array<{
    roomId: RoomModel['idRoom']
  }>
}
