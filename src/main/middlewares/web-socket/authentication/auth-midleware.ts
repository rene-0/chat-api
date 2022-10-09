import { socketIoAdaptMiddleware } from '../../../adapters/socket-io-middleware-adapter'
import { makeWebSocketAuthMiddleware } from '../../../factories/middleware/web-sockt/authentication/auth-middleware-factory'

export const socketAuth = socketIoAdaptMiddleware(makeWebSocketAuthMiddleware())
