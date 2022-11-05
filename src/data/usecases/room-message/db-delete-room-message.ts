import { DeleteRoomMessage } from '../../../domain/usecases/room-message/delete-room-message'
import { DeleteRoomMessageRepository } from '../../protocols/room-message/delete-room-message-repository'

export class DbDeleteRoomMessage implements DeleteRoomMessage {
  constructor (
    private readonly deleteRoomMessageRepository: DeleteRoomMessageRepository
  ) {}

  async deleteRoomMessage (request: DeleteRoomMessage.Request): Promise<DeleteRoomMessage.Response> {
    const wasEffective = await this.deleteRoomMessageRepository.deleteRoomMessage({ idRoomMessage: request.idMessage })

    return wasEffective
  }
}
