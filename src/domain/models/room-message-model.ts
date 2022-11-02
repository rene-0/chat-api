export type RoomMessageModel = {
  idRoomMessage: number
  user: string
  message: string
  time: string
  deleted: boolean
  edited: boolean
}

export type DbRoomMessageModel = {
  idRoomMessage: number
  idRoom: number
  idUser: number
  message: string
  dateTime: string
  deleted: 'N' | 'Y'
  edited: 'N' | 'Y'
}
