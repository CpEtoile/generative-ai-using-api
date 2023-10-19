import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenApiModule } from './open-ai/open-api.module';
import { CatsController } from './cats.controller';
import { GoogleAiApiModule } from './google/google-ai-api.module';

dotenv.config();

@Module({
  imports: [OpenApiModule, GoogleAiApiModule],
  controllers: [CatsController],
  providers: [AppService],
})
export class AppModule {}
