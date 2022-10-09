import app from '../config/app'
import Request from 'supertest'

describe('Content type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await Request(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/)
  })

  test('Should return xml content type as json when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await Request(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/)
  })
})
