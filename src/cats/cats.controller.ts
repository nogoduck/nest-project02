import {
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
} from '@nestjs/common';
import {CatsService} from './cats.service';
import {HttpExceptionFilter} from 'src/common/exceptions/http-exception.filter';
import {PositiveIntPipe} from '../common/pipes/positiveInt.pipe';
import {SuccessInterceptor} from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService) {
    }

    @Get()
    getAllCat() {
        console.log("getAllCat")
        return { cats: "getAllCat" };
    }

    @Get(':id')
    getOneCat(@Param('id', PositiveIntPipe) param: number) {
        console.log("getOneCat")
        console.log(param);
        console.log(typeof param);
        return `getOneCat - ${param}`;
    }

    @Post()
    createCat() {
        return 'createCat';
    }

    @Put(':id')
    updateCat() {
        return 'updateCat';
    }

    @Patch(':id')
    updatePartialCat() {
        return 'updatePartialCat';
    }

    @Delete(':id')
    deleteCat() {
        return 'deleteCat';
    }
}
