import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/comments.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';
import { CatsRepository } from '../../cats/cats.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentsCreateDto: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentsCreateDto;

      //author는 바로 넣어도 되지만  변조 가능성이 있기 때문에 해당하는 고양이가 있는지 확인한다.
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
