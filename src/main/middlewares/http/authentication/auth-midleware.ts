import { adaptMiddleware } from '../../../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../../../factories/middleware/http/authentication/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
