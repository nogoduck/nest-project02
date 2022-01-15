import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'getCurrentCat';
  }

  @Post()
  async signUp(@Body(ValidationPipe) catsRequestDto: CatsRequestDto) {
    return this.catsService.signUp(catsRequestDto);
  }

  @Post('login')
  async login(@Body() body) {
    return 'login';
  }

  @Post('logout')
  async logout() {
    return 'logout';
  }

  @Post('uplaod/cats')
  async uploadCatImg() {
    return 'uploadCatImg';
  }
}
