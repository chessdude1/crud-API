class UserController {
  private users: Array<IUser> | [];

  constructor() {
    this.users = [{id: 1, username: 'test', age: 3, hobbies: ['test']}];
  }

  getUsers = (req : any, res : any) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(this.users));
  }

}

export const userController = new UserController();

interface IUser {
  id: number;
  username: string,
  age: number,
  hobbies: Array<string> | [];
}