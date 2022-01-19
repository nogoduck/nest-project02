import { forwardRef, Module } from '@nestjs/common';
import { CatsService } from './services/cats.service';
import { CatsController } from './controllers/cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from '../comments/comments.schema';

// 모듈은 기본적으로 프로바이더(공급자)를 캡슐화 해주기때문에 exports를 통해서 내보내야 사용할 수 있다.
// exports를 하지 않고는 app.module의 providers 로 제공해줘야한다. (비추천 - 단일책임원칙이 깨짐)
// https://docs.nestjs.kr/modules
// provider는 기본적으로 캡슐화가 되어 있지만 exports를 통해 내보내주면 public 상태로 전한돼 다른 모듈에서도 사용할 수 있다.
// 순환 모듈 참조 해결방법: forwardRef(() => <ModuleName>), 순환하는 모듈 양쪽에서 해줘야 한다
// https://docs.nestjs.com/fundamentals/circular-dependency
@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
