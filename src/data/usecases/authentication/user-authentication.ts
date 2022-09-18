import { Authentication } from '../../../domain/usecases/authentication/user-authentication'
import { UserAuthenticationRepository } from '../../protocols/authentication/user-authentication'
import crypto from 'crypto'

export class UserAuthentication implements Authentication {
  constructor (
    private readonly authenticationRepository: UserAuthenticationRepository
  ) {}

  async authenticate (request: Authentication.Request): Promise<Authentication.Response> {
    const { email, password } = request
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user = await this.authenticationRepository.authenticate({ email, password: hash })
    return user
  }
}
