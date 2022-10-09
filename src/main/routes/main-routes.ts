import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeLoginController } from '../factories/controllers/http/authentication/login-controller-factory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
