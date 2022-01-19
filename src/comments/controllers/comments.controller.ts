import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 입력' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() commentsCreateDto: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, commentsCreateDto);
  }

  @ApiOperation({ summary: '좋아요 증감' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
