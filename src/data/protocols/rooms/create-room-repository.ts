import Transaction from 'sequelize/types/transaction'

export interface CreateRoomRepository {
  createRoom: (request: CreateRoomRepository.Request, transaction: Transaction) => Promise<CreateRoomRepository.Response>
}

export namespace CreateRoomRepository {
  export type Request = {
    roomName: string
  }

  export type Response = number
}
