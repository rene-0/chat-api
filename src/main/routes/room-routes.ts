import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeFindAllRoomsController } from '../factories/controllers/http/rooms/find-all-rooms-controller-facotry'
import { auth } from '../middlewares/http/authentication/auth-midleware'

export default (router: Router): void => {
  router.post('/rooms/findAll', auth, adaptRoute(makeFindAllRoomsController()))
}
