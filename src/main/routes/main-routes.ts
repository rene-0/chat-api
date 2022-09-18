import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeLoginController } from '../factories/controllers/authentication/login-controller-factory'
import { auth } from '../middlewares/authentication/auth-midleware-factory'

export default (router: Router): void => {
  // router.post('/login', auth, adaptRoute(makeLoginController()))
  router.post('/login', auth, adaptRoute(makeLoginController()))
}
