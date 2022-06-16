import { app } from "./app";

class Router {
  private _endpoints : IEndpoints

  constructor() {
    this._endpoints = {};
  }

  private _addEndPointHandler(path : string, method : EMethods, handler : (req : any, res : any) => any) {

    if (this._endpoints[path]) {
      if (this._endpoints[path][method]) {
        console.log(`Method: ${method} if ${path} already exist`)
        return
      }
    }

    this._endpoints = {...this._endpoints, path : {...this._endpoints[path], [method] : handler}};

    app.getEmmiter.on(app.getEmmiterTemplateString(path, method), handler)
  }

  get(path : string, handler : (req : any, res : any) => any) {
    this._addEndPointHandler(path, EMethods.GET, handler)
  }

  post(path : string, handler : (req : any, res : any) => any) {
    this._addEndPointHandler(path, EMethods.POST, handler)
  }

  put(path : string, handler : (req : any, res : any) => any) {
    this._addEndPointHandler(path, EMethods.PUT, handler)
  }

  delete(path : string, handler : (req : any, res : any) => any) {
    this._addEndPointHandler(path, EMethods.DELETE, handler)
  }  
}

export const router = new Router()

interface IEndpoints {
  [route : string] : {
    GET  ?: (req : any, res : any) => any,
    POST ?: (req : any, res : any) => any,
    PUT ?: (req : any, res : any) => any,
    DELETE ?: (req : any, res : any) => any
   };
}


export enum EMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
