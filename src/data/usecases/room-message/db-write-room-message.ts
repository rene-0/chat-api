import { WriteRoomMessage } from '../../../domain/usecases/room-message/db-write-room-message'
import { LoadLastInsertedRoomMessageRepository } from '../../protocols/room-message/load-last-inserted-message-repository'
import { WriteRoomMessageRepository } from '../../protocols/room-message/write-room-message-repository'

export class DbWriteRoomMessage implements WriteRoomMessage {
  constructor (
    private readonly writeRoomMessageRepository: WriteRoomMessageRepository,
    private readonly loadLastRoomMessageRepository: LoadLastInsertedRoomMessageRepository
  ) {}

  async writeRoomMessage (request: WriteRoomMessage.Request): Promise<WriteRoomMessage.Response> {
    const lastInsertedId = await this.writeRoomMessageRepository.writeRoomMessage(request)

    const lestInsertedMessage = await this.loadLastRoomMessageRepository.loadLastRoomMessage({ idRoomMessage: lastInsertedId })

    const roomMessage: WriteRoomMessage.Response = {
      ...lestInsertedMessage,
      deleted: lestInsertedMessage.deleted === 'S',
      edited: lestInsertedMessage.edited === 'S'
    }

    return roomMessage
  }
}
