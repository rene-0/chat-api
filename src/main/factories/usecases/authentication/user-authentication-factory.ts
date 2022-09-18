import { UserAuthentication } from '../../../../data/usecases/authentication/user-authentication'
import { AuthenticationRepository } from '../../../../infra/db/sequelize/authentication-repository'
import { SequelizeHelper } from '../../../../infra/helper/sequelize-helper'

export const makeUserAuthentication = (): UserAuthentication => {
  const authenticationRepository = new AuthenticationRepository(SequelizeHelper)
  return new UserAuthentication(authenticationRepository)
}
