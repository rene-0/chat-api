import { LoginController } from '../../../../../presentation/controllers/http/authentication/login-controller'
import { makeUserAuthentication } from '../../../usecases/authentication/user-authentication-factory'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeUserAuthentication())
}
