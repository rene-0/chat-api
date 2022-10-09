import { Express } from 'express'
import cors from 'cors'
import { contentType } from '../middlewares/http/content-type'
import { bodyParser } from '../middlewares/http/body-parser'

export default (app: Express): void => {
  app.use(contentType)
  app.use(bodyParser)
  app.use(cors())
}
