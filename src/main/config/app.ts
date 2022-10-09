import express from 'express'
import setUpMiddleWares from './express-middlewares'
import setUpRoutes from './routes'

const app = express()
setUpMiddleWares(app)
setUpRoutes(app)

export default app
