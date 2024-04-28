import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    console.log(`${req.method} `, {
      url: req.originalUrl,
      from: req.socket.remoteAddress,
      body: JSON.stringify(req.body),
    }); // Ends middleware function execution, hence allowing to move on
    if (next) {
      next();
    }
  }
}
