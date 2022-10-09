import fg from 'fast-glob'
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export default (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {
  fg.sync('**/src/main/events/**events.ts').map(async file => {
    (await import(`../../../${file}`)).default(server)
  })
}
