import { DbFindUsersToAddToRoom } from '../../../../data/usecases/users/db-users-to-add-to-room'
import { UserRepository } from '../../../../infra/db/sequelize/user-repository'

export const makeDbFindUsersToAddToRoom = (): DbFindUsersToAddToRoom => {
  const userRepository = new UserRepository()
  return new DbFindUsersToAddToRoom(userRepository)
}
