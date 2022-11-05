import { CanDeleteRoomMessage } from '../../../domain/usecases/room-message/can-delete-room-message'
import { CanUpdateRoomMessage } from '../../../domain/usecases/room-message/can-update-room-message'
import { LoadRoomMessageModelRepository } from '../../protocols/room-message/load-room-message-repository'

export class DbCanDeleteRoomMessage implements CanDeleteRoomMessage {
  constructor (
    private readonly loadRoomMessageModelRepository: LoadRoomMessageModelRepository
  ) {}

  async canDeleteRoomMessage (request: CanDeleteRoomMessage.Request): Promise<CanDeleteRoomMessage.Response> {
    const { idUser, idMessage, idRoom } = request
    const can: CanUpdateRoomMessage.Response = {
      isValid: true,
      errorMessage: []
    }

    const roomMessage = await this.loadRoomMessageModelRepository.loadRoomMessageModel({ idMessage })

    if (roomMessage.idUser !== idUser) {
      can.errorMessage.push('Erro, mensagem inválida')
    }

    if (roomMessage.idRoom === idRoom) {
      can.errorMessage.push('Erro, mensagem não pertence a sala')
    }

    return can
  }
}
