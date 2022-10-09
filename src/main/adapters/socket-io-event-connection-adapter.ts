import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { EventController } from '../../presentation/protocols/avent-controller'
import fg from 'fast-glob'

export const adaptConnectionEvent = (
  controller: EventController,
  server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  return async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const httpResponse = await controller.handle(server, socket, {})
    if (httpResponse.statusCode !== 200) {
      console.log("socket.on('asdsa')")
    }
    fg.sync('**/src/main/events/connection/**events.ts').map(async file => {
      (await import(`../../../${file}`)).default(server, socket)
    })
  }
}
