import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { name: 'Daniel Carlos. Hello World!' };
  }
}
