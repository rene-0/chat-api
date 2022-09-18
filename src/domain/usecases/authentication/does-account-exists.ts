export interface DoesAccountExists {
  doesAccountExists: (request: DoesAccountExists.Request) => Promise<DoesAccountExists.Response>
}

export namespace DoesAccountExists {
  export type Request = {
    email: string
  }

  export type Response = boolean
}
