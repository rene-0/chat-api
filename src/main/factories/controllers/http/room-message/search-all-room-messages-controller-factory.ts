import { SearchAllRoomMessagesController } from '../../../../../presentation/controllers/rooms-messages/search-all-room-messages-controller'
import { makeDbSearchAllRoomMessages } from '../../../usecases/room-message/db-search-all-room-messages-factory'

export const makeSearchAllRoomMessagesController = (): SearchAllRoomMessagesController => {
  return new SearchAllRoomMessagesController(makeDbSearchAllRoomMessages())
}
