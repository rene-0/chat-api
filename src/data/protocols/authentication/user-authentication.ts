import { UserModel } from '../../../domain/models/user-model'

export interface UserAuthenticationRepository {
  authenticate: (request: UserAuthenticationRepository.Request) => Promise<UserAuthenticationRepository.Response>
}

export namespace UserAuthenticationRepository {
  export type Request = {
    email: string
    password: string
  }

  export type Response = Omit<UserModel, 'password' | 'lastConnected'>
}
