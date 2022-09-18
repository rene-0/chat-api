import { SequelizeHelper } from '../infra/helper/sequelize-helper'
import http from 'http'
import env from './config/env'
import { SocketIoHelper } from '../infra/helper/socket-io-helper'

const port = env.port
SequelizeHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    )
    const httpServer = http.createServer(app)
    SocketIoHelper.attach(httpServer, { cors: { origin: '*' } })
  })
  .catch(console.error)
