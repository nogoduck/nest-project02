import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Cat } from './cats.schema';
import { CatsRequestDto } from './dto/cats.request.dto';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(catsRequestDto: CatsRequestDto) {
    const { email, name, password } = catsRequestDto;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      // UnauthorizedException을 사용하면 자동으로 403에러를 발생시킨다.
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
