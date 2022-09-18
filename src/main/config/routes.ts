import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/chat', router)
  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    (await import(`../../../${file}`)).default(router)
  })
}
