import { FindAllRoomsController } from '../../../../../presentation/controllers/http/rooms/find-all-rooms-controller'
import { makeDbFindAllRooms } from '../../../usecases/rooms/db-find-all-rooms-factory'

export const makeFindAllRoomsController = (): FindAllRoomsController => {
  return new FindAllRoomsController(makeDbFindAllRooms())
}
