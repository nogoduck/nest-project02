import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';

//모듈은 기본적으로 프로바이더(공급자)를 캡슐화 해주기때문에 exports를 통해서 내보내야 사용할 수 있다.
//exports를 하지 않고는 app.module의 providers 로 제공해줘야한다. (비추천 - 단일책임원칙이 깨짐)
// https://docs.nestjs.kr/modules
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
