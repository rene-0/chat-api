import Transaction from 'sequelize/types/transaction'

export interface AddUserAdminToRoomRepository {
  addUserAdminToRoom: (request: AddUserAdminToRoomRepository.Request, transaction: Transaction) => Promise<AddUserAdminToRoomRepository.Response>
}

export namespace AddUserAdminToRoomRepository {
  export type Request = {
    idUser: number
    idRoom: number
  }

  export type Response = boolean
}
