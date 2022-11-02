import { UpdateRoomMessage } from '../../../domain/usecases/room-message/db-update-room-message'
import { UpdateRoomMessageRepository } from '../../protocols/room-message/update-room-message-repository'

export class DbUpdateRoomMessage implements UpdateRoomMessage {
  constructor (
    private readonly updateRoomMessageRepository: UpdateRoomMessageRepository
  ) {}

  async updateRoomMessage (request: UpdateRoomMessage.Request): Promise<void> {
    await this.updateRoomMessageRepository.updateRoomMessage(request)
  }
}
