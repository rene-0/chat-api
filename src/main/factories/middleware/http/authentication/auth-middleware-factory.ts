import { AuthController } from '../../../../../presentation/middleware/http/authentication/auth-middleware'
import { makeDoesAccountExists } from '../../../usecases/authentication/does-account-exists-factory'

export const makeAuthMiddleware = (): AuthController => {
  return new AuthController(makeDoesAccountExists())
}
