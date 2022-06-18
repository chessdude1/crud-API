import { server } from '../index'
import * as request from 'supertest'

describe('delete test case', () => {
  it('delete 1 user', async () => {
    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const getUserRes = await request(server).get('/api/users')

    const deleteUserRes = await request(server).delete(
      `/api/users/${getUserRes.body[0].id}`
    )

    const getUsersRes = await request(server).get('/api/users')

    expect(deleteUserRes.statusCode).toBe(204)

    expect(getUsersRes.body.length).toEqual(0)
  })

  it('delete user with not uuid', async () => {
    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const deleteUserRes = await request(server).delete(`/api/users/1`)

    const getUsersRes = await request(server).get('/api/users')

    expect(getUsersRes.body.length).toEqual(1)

    expect(deleteUserRes.statusCode).toBe(400)
  })

  it('delete now existed user', async () => {
    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const deleteUserRes = await request(server).delete(
      `/api/users/5438e444-8152-40ba-b9b3-58cbc0198b16`
    )

    const getUsersRes = await request(server).get('/api/users')

    expect(getUsersRes.body.length).toEqual(2)

    expect(deleteUserRes.statusCode).toBe(404)
  })
})
