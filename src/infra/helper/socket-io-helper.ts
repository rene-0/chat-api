import { Server, ServerOptions } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import http from 'http'

export type SocketIoHelperType = {
  server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
}

export const SocketIoHelper = {
  server: new Server(),
  attach: (httpServer: http.Server, options: Partial<ServerOptions> = {}) => {
    SocketIoHelper.server.attach(httpServer, options)
  }
}
