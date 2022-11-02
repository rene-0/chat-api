import { SearchAllRoomMessages } from '../../../domain/usecases/room-message/db-search-all-room-messages'
import { SearchAllRoomMessagesRepository } from '../../protocols/room-message/search-all-room-messages-repository'

export class DbSearchAllRoomMessages implements SearchAllRoomMessages {
  constructor (
    private readonly searchAllRoomMessagesRepository: SearchAllRoomMessagesRepository
  ) {}

  async searchAllRoomMessages (request: SearchAllRoomMessages.Request): Promise<SearchAllRoomMessages.Response> {
    const loadedAllRoomMessages = await this.searchAllRoomMessagesRepository.searchAllRoomMessages(request)
    const allRoomMessages = loadedAllRoomMessages.map(roomMessage => ({
      ...roomMessage,
      deleted: roomMessage.deleted === 'Y',
      edited: roomMessage.edited === 'Y'
    }))
    return allRoomMessages
  }
}
