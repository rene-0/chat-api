import { SequelizeHelper } from '../infra/helper/sequelize-helper'
import http from 'http'
import env from './config/env'
import { SocketIoHelper } from '../infra/helper/socket-io-helper'
import socketIoMiddlewares from './config/socket-io-middlewares'

const port = env.port
SequelizeHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    const httpServer = http.createServer(app)
    SocketIoHelper.attach(httpServer, { cors: { origin: '*' } })
    httpServer.listen(port);
    (await import('./config/events')).default(SocketIoHelper.server)
    socketIoMiddlewares(SocketIoHelper.server)
    console.log(`Server running at http://localhost:${port}`)
  })
  .catch(console.error)
