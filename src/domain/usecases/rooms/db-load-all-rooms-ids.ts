export interface LoadAllRoomsIds {
  loadAllRoomsIds: () => Promise<LoadAllRoomsIds.Response>
}

export namespace LoadAllRoomsIds {
  export type Response = number[]
}
