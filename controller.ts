import * as http from 'http'
import { validate, v4 as uuidV4 } from 'uuid'

class UserController {
  private users: Array<IUser>

  constructor() {
    this.users = []
  }

  getUsers = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string
  ) => {
    if (id) {
      this.getUser(req, res, id)
      return
    }

    this._responseConstructor(req, res, this.users, 200)
    return
  }

  getUser = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string
  ) => {
    if (!validate(id as string)) {
      this._responseConstructor(req, res, 'id is not uuid', 200)
      return
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this._responseConstructor(req, res, this.users[i], 200)
        return
      }
    }

    this._responseConstructor(req, res, `user with ${id} not found`, 404)
    return
  }

  deleteUser = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string
  ) => {
    if (!validate(id as string)) {
      this._responseConstructor(req, res, 'id is not uuid', 400)
      return
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this._responseConstructor(req, res, this.users[i], 204)
        this.users.splice(i, 1)
        return
      }
    }

    this._responseConstructor(req, res, `user not found`, 404)
    return
  }

  putUser = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string,
    data?: any
  ) => {
    if (data.hasOwnProperty('id')) {
      this._responseConstructor(
        req,
        res,
        'field id reserved by the system',
        400
      )
      return
    }

    if (data.hasOwnProperty('username') && typeof data.username !== 'string') {
      this._responseConstructor(
        req,
        res,
        'field username should be string type',
        400
      )
      return
    }

    if (data.hasOwnProperty('age') && typeof data.age !== 'number') {
      this._responseConstructor(
        req,
        res,
        'field age should be number type',
        400
      )
      return
    }

    if (data.hasOwnProperty('hobbies')) {
      if (!Array.isArray(data.hobbies)) {
        this._responseConstructor(req, res, 'hobbies should be array type', 400)
        return
      }

      if (data.hobbies[0]) {
        for (let i = 0; i < data.hobbies.length; i++) {
          if (typeof data.hobbies[i] !== 'string') {
            this._responseConstructor(
              req,
              res,
              `all hobbies instances should be string type`,
              400
            )
            return
          }
        }
      }
    }

    if (!validate(id as string)) {
      this._responseConstructor(req, res, 'id is not uuid', 400)
      return
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        const updatedUser = { ...this.users[i], ...data }
        this.users[i] = updatedUser
        this._responseConstructor(req, res, updatedUser, 200)
        return
      }
    }

    this._responseConstructor(req, res, `user with id : ${id} not found`, 404)
    return
  }

  postUser = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    _?: string,
    data?: any
  ) => {
    if (
      data.username &&
      data.age &&
      data.hobbies &&
      typeof data.username === 'string' &&
      !isNaN(data.age) &&
      Array.isArray(data.hobbies)
    ) {
      if (data.hobbies[0]) {
        for (let i = 0; i < data.hobbies.length; i++) {
          if (typeof data.hobbies[i] !== 'string') {
            this._responseConstructor(
              req,
              res,
              `all hobbies should be string type`,
              400
            )
            return
          }
        }
      }
      const newUser = {
        id: uuidV4(),
        ...data,
      }

      this.users.push(newUser)
      this._responseConstructor(req, res, newUser, 201)

      return
    }

    this._responseConstructor(req, res, `fill all required fields`, 400)
    return
  }

  private _responseConstructor(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: any,
    code: number
  ) {
    res.writeHead(code, {
      'Content-type': 'application/json',
    })
    res.end(JSON.stringify(data))
  }
}

export const userController = new UserController()

interface IUser {
  id: string
  username: string
  age: number
  hobbies: Array<string> | []
}
