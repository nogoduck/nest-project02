import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions, Document, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

// 스키마명을 지정하지 않으면 mongoose 스키마에서 자동으로 스키마 이름을 지어준다
// Cat => cats (소문자로 바꾸고 복수형으로 붙여줌)

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '댓글 작성한 고양이 id',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: '댓글 컨텐츠',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '댓글 좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '댓글 작성 대상(EX. 게시물)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
