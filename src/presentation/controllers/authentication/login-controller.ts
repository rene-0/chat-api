import { Authentication } from '../../../domain/usecases/authentication/user-authentication'
import { ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http'
import jwt from 'jsonwebtoken'

export class LoginController implements Controller {
  constructor (
    private readonly useAuthentication: Authentication
  ) {}

  async handle (httpRequest: LoginController.Request): Promise<HttpResponse<LoginController.Response>> {
    try {
      const auth = await this.useAuthentication.authenticate(httpRequest)

      if (!auth) {
        return unauthorized(new Error('Invalid credentials'))
      }

      const expiresIn = 60 * 60

      const token = jwt.sign(auth, 'secret', { expiresIn })

      return ok({ token, expiresIn })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }

  export type Response = {
    token: string
  }
}
