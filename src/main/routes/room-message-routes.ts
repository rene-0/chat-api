import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeSearchAllRoomMessagesController } from '../factories/controllers/http/room-message/search-all-room-messages-controller-factory'
import { auth } from '../middlewares/http/authentication/auth-midleware'

export default (router: Router): void => {
  router.get('/roomsMessage/searchAll/:idRoom', auth, adaptRoute(makeSearchAllRoomMessagesController()))
}
