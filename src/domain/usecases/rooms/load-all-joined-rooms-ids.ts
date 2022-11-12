export interface LoadAllJoinedRoomsIds {
  loadAllJoinedRoomsIds: (request: LoadAllJoinedRoomsIds.Request) => Promise<LoadAllJoinedRoomsIds.Response>
}

export namespace LoadAllJoinedRoomsIds {
  export type Request = {
    userId: number
  }

  export type Response = number[]
}
