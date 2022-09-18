export interface DoesAccountExistsRepository {
  doesAccountExists: (request: DoesAccountExistsRepository.Request) => Promise<DoesAccountExistsRepository.Response>
}

export namespace DoesAccountExistsRepository {
  export type Request = {
    email: string
  }

  export type Response = any[]
}
