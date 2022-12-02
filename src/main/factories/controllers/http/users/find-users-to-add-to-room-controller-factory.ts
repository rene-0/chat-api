import { FindUsersToAddToRoomController } from '../../../../../presentation/controllers/http/users/find-users-to-add-to-room-controller'
import { makeDbFindUsersToAddToRoom } from '../../../usecases/users/db-users-to-add-to-room-repository'

export const dbFindUsersToAddToRoomController = (): FindUsersToAddToRoomController => {
  return new FindUsersToAddToRoomController(makeDbFindUsersToAddToRoom())
}
