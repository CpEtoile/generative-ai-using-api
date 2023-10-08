import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenApiModule } from './open-ai/open-api.module';
import { CatsController } from './cats.controller';

dotenv.config();

@Module({
  imports: [OpenApiModule],
  controllers: [CatsController],
  providers: [AppService]
})
export class AppModule {
}
