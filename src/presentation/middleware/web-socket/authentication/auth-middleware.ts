import { DoesAccountExists } from '../../../../domain/usecases/authentication/does-account-exists'
import { ok, serverError, forbidden } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpResponse } from '../../../protocols/http'
import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { AccessTokenPayloadModel } from '../../../../domain/models/access-token-payload-model'

export class WebSocketAuthController implements Controller {
  constructor (
    private readonly dbDoesAccountExists: DoesAccountExists
  ) {}

  async handle (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): Promise<HttpResponse<any>> {
    try {
      const { token: accessToken } = socket.handshake.auth.accessToken

      if (!accessToken) {
        return forbidden(new Error('Access denied'))
      }

      let isTokenValid = true
      let decodedToken: AccessTokenPayloadModel
      jwt.verify(accessToken, 'secret', (error, decoded: AccessTokenPayloadModel): void => {
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
