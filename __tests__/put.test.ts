import { server } from './../index'
import * as request from 'supertest'

describe('put test case', () => {
  it('put not required field in user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    expect(res.statusCode).toBe(201)

    const getUserRes = await request(server).get('/api/users')

    const id = getUserRes.body[0].id

    const resPut = await request(server).put(`/api/users/${id}`).send({
      notRequiredField: 'test',
    })

    expect(resPut.body.notRequiredField).toEqual('test')
  })

  it('put required with wrong type', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    expect(res.statusCode).toBe(201)

    const getUserRes = await request(server).get('/api/users')

    const id = getUserRes.body[0].id

    const resPut = await request(server).put(`/api/users/${id}`).send({
      username: 8,
    })

    expect(resPut.statusCode).toBe(400)
  })

  it('put with not uuid id', async () => {
    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const resPut = await request(server).put(`/api/users/1`).send({
      test: 8,
    })

    expect(resPut.statusCode).toBe(400)
  })

  it('put with uuid not existing user', async () => {
    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const resPut = await request(server)
      .put(`/api/users/5438e444-8152-40ba-b9b3-58cbc0198b16`)
      .send({
        test: 8,
      })

    expect(resPut.statusCode).toBe(404)
  })
})
