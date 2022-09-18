import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../../factories/middleware/authentication/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
