import * as http from 'http'
import { EventEmitter } from 'events'
import { EMethods } from './router'
import { URLParser } from './urlParser'

class App {
  private _emmiter: EventEmitter

  constructor(emmiter: EventEmitter) {
    this._emmiter = emmiter
  }

  _createServer() {
    return http.createServer((req, res) => {
      try {
        const { id, url } = URLParser(req.url || '')

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          const data = JSON.parse(body || '{}')
  
          const isEmmited = this.getEmmiter.emit(
            this.getEmmiterTemplateString(
              url,
              (req.method as EMethods) || EMethods.GET
            ),
            req,
            res,
            id,
            data
          )
          if (!isEmmited) {
            res.writeHead(404, {
              'Content-type': 'application/json',
            })
            res.end('url not found')
            return
          }
        })
      } catch (e) {
        res.writeHead(500, {
          'Content-type': 'application/json',
        })
        res.end('server error')
        return
      }
    })
  }

  get getEmmiter() {
    return this._emmiter
  }

  getEmmiterTemplateString(path: string, method: EMethods) {
    return `path:${path} | method:${method}`
  }
}

export const app = new App(new EventEmitter())
