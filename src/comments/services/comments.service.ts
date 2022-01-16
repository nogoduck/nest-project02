import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'getAllComments';
  }

  async createComment(id: string, commentsCreateDto: CommentsCreateDto) {
    return 'createComment';
  }

  async plusLike(id: string) {
    return 'plusLike';
  }
}
