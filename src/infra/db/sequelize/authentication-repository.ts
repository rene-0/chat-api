import { QueryTypes } from 'sequelize'
import { DoesAccountExistsRepository } from '../../../data/protocols/authentication/does-account-exists'
import { UserAuthenticationRepository } from '../../../data/protocols/authentication/user-authentication'
import { SequelizeHelper } from '../../helper/sequelize-helper'

export class AuthenticationRepository implements UserAuthenticationRepository, DoesAccountExistsRepository {
  constructor (
    private readonly sequelize = SequelizeHelper
  ) {}

  async doesAccountExists (request: DoesAccountExistsRepository.Request): Promise<DoesAccountExistsRepository.Response> {
    const { email } = request
    const sql = `
      SELECT 1
      FROM users
      WHERE email = :email
      LIMIT 1
    `

    const replacements = {
      email
    }

    const account = await this.sequelize.client.query<DoesAccountExistsRepository.Response>(sql, { type: QueryTypes.SELECT, replacements })
    return account
  }

  async authenticate (request: UserAuthenticationRepository.Request): Promise<UserAuthenticationRepository.Response> {
    const { email, password } = request
    const sql = `
      SELECT id_user idUser, name, email
      FROM users
      WHERE email = :email AND password = :password
    `

    const replacements = {
      email,
      password
    }

    const user = await this.sequelize.client.query<UserAuthenticationRepository.Response>(sql, { type: QueryTypes.SELECT, replacements })
    return user[0]
  }
}
