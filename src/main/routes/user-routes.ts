import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { dbFindUsersToAddToRoomController } from '../factories/controllers/http/users/find-users-to-add-to-room-controller-factory'
import { auth } from '../middlewares/http/authentication/auth-midleware'

export default (router: Router): void => {
  router.get('/users/findUsersToAddToRoom/:roomId', auth, adaptRoute(dbFindUsersToAddToRoomController()))
}
