import http from 'http';
import EventEmitter from 'events';
import { EMethods } from './router';
import { URLParser } from './urlParser';

class App {
  private _emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this._emmiter = emmiter;
  }

  _createServer() {
    return http.createServer((req, res) => {
      const { id, url } = URLParser(req.url || '');

      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        const isEmmited = this.getEmmiter.emit(
          this.getEmmiterTemplateString(
            url,
            (req.method as EMethods) || EMethods.GET
          ),
          req,
          res,
          id
        );
        if (!isEmmited) {
          res.writeHead(404, {
            'Content-type': 'application/json',
          });
          res.end('url not found');
        }
      });
    });
  }

  get getEmmiter() {
    return this._emmiter;
  }

  getEmmiterTemplateString(path: string, method: EMethods) {
    return `path:${path} | method:${method}`;
  }
}

export const app = new App(new EventEmitter());
