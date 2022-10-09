import { RoomModel } from '../../../domain/models/room-model'

export interface LoadAllRoomsIdsRepository {
  loadAllRoomsIds: () => Promise<LoadAllRoomsIdsRepository.Response>
}

export namespace LoadAllRoomsIdsRepository {
  export type Response = Array<Pick<RoomModel, 'idRoom'>>
}
