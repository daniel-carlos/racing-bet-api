import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Daniel Carlos. Hello World!';
  }

  getCarai(): string {
    return 'Vai se foder!';
  }
}
