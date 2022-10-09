import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { EventController } from '../../presentation/protocols/avent-controller'

export const adaptEvent = (
  controller: EventController,
  server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  return async (req: any) => {
    const httpResponse = await controller.handle(server, socket, req)
    if (httpResponse.statusCode !== 200) {
      console.log('make error handler')
    }
  }
}
