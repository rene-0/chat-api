import { ConnectionController } from '../../../../presentation/controllers/web-socket/connection-controller'
import { makeDbLoadAllRoomsIds } from '../../usecases/rooms/db-load-all-rooms-ids-factory'

export const makeConnectionController = (): ConnectionController => {
  return new ConnectionController(makeDbLoadAllRoomsIds())
}
