import * as request from 'supertest'
import {server} from '../index'

describe('get test case', () => {

  it('get all users', async () => {
    const res = await request(server).get('/api/users')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })

  it('get users after post', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    expect(res.statusCode).toBe(201)

    const getUserRes = await request(server).get('/api/users')

    expect(getUserRes.body.length).toEqual(1)

    await request(server)
      .post('/api/users')
      .send({ username: 'test-user', age: 18, hobbies: ['test'] })

    const getUsersRes = await request(server).get('/api/users')

    expect(getUsersRes.body.length).toEqual(2)

    expect(getUsersRes.body[0].hasOwnProperty('id')).toBeTruthy()
  })
})
