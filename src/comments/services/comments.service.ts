import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  getAllComments() {
    return 'comments';
  }
}
