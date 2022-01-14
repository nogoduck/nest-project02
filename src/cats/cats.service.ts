import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  callCat() {
    return 'hello cat~';
  }
}
