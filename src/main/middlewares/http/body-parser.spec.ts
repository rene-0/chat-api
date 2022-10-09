import app from '../../config/app'
import Request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await Request(app)
      .post('/test_body_parser')
      .send({ name: 'test' })
      .expect({ name: 'test' })
  })
})
