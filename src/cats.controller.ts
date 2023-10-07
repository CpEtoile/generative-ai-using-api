import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string[] {
    return ['Cat 1', 'Cat 2'];
  }
}
