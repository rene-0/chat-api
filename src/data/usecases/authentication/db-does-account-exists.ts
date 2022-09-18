import { DoesAccountExists } from '../../../domain/usecases/authentication/does-account-exists'
import { DoesAccountExistsRepository } from '../../protocols/authentication/does-account-exists'

export class DbDoesAccountExists implements DoesAccountExists {
  constructor (
    private readonly doesLoginExistsRepository: DoesAccountExistsRepository
  ) {}

  async doesAccountExists (request: DoesAccountExists.Request): Promise<DoesAccountExists.Response> {
    const { email } = request
    const account = await this.doesLoginExistsRepository.doesAccountExists({ email })
    return account.length > 0
  }
}
