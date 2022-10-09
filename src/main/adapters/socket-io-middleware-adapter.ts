import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Middleware } from '../../presentation/protocols/middleware'

export const socketIoAdaptMiddleware = (middleware: Middleware) => {
  return async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, { userName: string }>, next: (err?: ExtendedError) => void) => {
    const httpResponse = await middleware.handle(socket)
    console.log('httpResponse', httpResponse)
    if (httpResponse.statusCode === 200) {
      next()
    } else {
      console.log('make a error handler')
    }
  }
}
