import { UserModel } from '../../models/user-model'

export interface Authentication {
  authenticate: (request: Authentication.Request) => Promise<Authentication.Response>
}

export namespace Authentication {
  export type Request = {
    email: string
    password: string
  }

  export type Response = Omit<UserModel, 'password' | 'lastConnected'>
}
