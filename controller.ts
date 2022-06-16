import http from 'http';
import { validate, v4 as uuidV4 } from 'uuid';

class UserController {
  private users: Array<IUser> | [];

  constructor() {
    this.users = [];
  }

  getUsers = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string
  ) => {
    if (id) {
      this.getUser(req, res, id);
      return;
    }

    this._responseConstructor(req, res, this.users, 400);
  };

  getUser = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: string
  ) => {
    if (!validate(id as string)) {
      this._responseConstructor(req, res, 'id is not uuid', 200);
      return;
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === Number(id)) {
        this._responseConstructor(req, res, this.users[i], 200);
        return;
      }
    }

    this._responseConstructor(req, res, `user with ${id} not found`, 404);

    return;
  };

  

  private _responseConstructor(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    data: any,
    code: number
  ) {
    res.writeHead(code, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(data));
  }
}

export const userController = new UserController();

interface IUser {
  id: number;
  username: string;
  age: number;
  hobbies: Array<string> | [];
}
