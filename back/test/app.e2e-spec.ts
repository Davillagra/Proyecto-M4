import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDNhOTU2Ny0wOWQ2LTQ3ZGMtYWI2OC05OWZmMGUxYmFlMzgiLCJpZCI6IjQwM2E5NTY3LTA5ZDYtNDdkYy1hYjY4LTk5ZmYwZTFiYWUzOCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzE3MTEwMDM1LCJleHAiOjE3MjU3NTAwMzV9.8uiGLVQTFTV-qNMqGJSFQ53WlEjcixCqYntVdzboJqI'
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Get /users returns an array of users', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', token)
    expect(req.status).toBe(200)
    console.log(req.body)

    expect(req.body).toBeInstanceOf(Array)
  })
  it('Get /users/1 returns an object of user', async () => {
    const id = 1
    const req = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .set('Authorization', token)
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  })
})
