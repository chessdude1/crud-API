//@ts-nocheck
import http from 'http';
import EventEmitter from "events";
import { EMethods } from "./router";

class App {

  private _emmiter : EventEmitter

  constructor(emmiter : EventEmitter) {
    this._emmiter = emmiter
  }

  _createServer() {
    return http.createServer((req, res) => {

     this.getEmmiter.emit(this.getEmmiterTemplateString(req.url as string , req.method && EMethods.GET ), req, res);
      
      req.on('data', (chunk) => {
        console.log( JSON.parse(chunk))
      })

      res.end('Server off')
    })
  }

  get getEmmiter() {
    return this._emmiter
  }

  getEmmiterTemplateString(path : string, method : EMethods) {
    return `path:${path} | method:${method}`
  }
}

export const app = new App(new EventEmitter)