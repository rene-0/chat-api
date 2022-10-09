import { forbidden, ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import jwt from 'jsonwebtoken'
import { DoesAccountExists } from '../../../../domain/usecases/authentication/does-account-exists'
import { UserModel } from '../../../../domain/models/user-model'

export class AuthController implements Controller {
  constructor (
    private readonly dbDoesAccountExists: DoesAccountExists
  ) {}

  async handle (httpRequest: AuthController.Request): Promise<HttpResponse<any>> {
    try {
      const { accessToken } = httpRequest

      if (!accessToken) {
        return forbidden(new Error('Access denied'))
      }

      let isTokenValid = true
      let decodedToken: Omit<UserModel, 'password' | 'lastConnected'>
      jwt.verify(accessToken, 'secret', (error, decoded: Omit<UserModel, 'password' | 'lastConnected'>): void => {
        if (error) {
          isTokenValid = false
        }
        decodedToken = decoded
      })

      if (!isTokenValid) {
        return forbidden(new Error('Access denied'))
      }

      const accountExists = await this.dbDoesAccountExists.doesAccountExists({ email: decodedToken.email })

      if (!accountExists) {
        return forbidden(new Error('Access denied'))
      }

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthController {
  export type Request = {
    accessToken: string
  }
}
