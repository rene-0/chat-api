import { DbDoesAccountExists } from '../../../../data/usecases/authentication/db-does-account-exists'
import { AuthenticationRepository } from '../../../../infra/db/sequelize/authentication-repository'
import { SequelizeHelper } from '../../../../infra/helper/sequelize-helper'

export const makeDoesAccountExists = (): DbDoesAccountExists => {
  const authenticationRepository = new AuthenticationRepository(SequelizeHelper)
  return new DbDoesAccountExists(authenticationRepository)
}
