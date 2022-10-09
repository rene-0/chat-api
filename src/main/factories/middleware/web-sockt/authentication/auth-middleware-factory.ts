import { WebSocketAuthController } from '../../../../../presentation/middleware/web-socket/authentication/auth-middleware'
import { makeDoesAccountExists } from '../../../usecases/authentication/does-account-exists-factory'

export const makeWebSocketAuthMiddleware = (): WebSocketAuthController => {
  return new WebSocketAuthController(makeDoesAccountExists())
}
