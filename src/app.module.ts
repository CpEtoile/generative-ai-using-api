import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenApiModule } from './open-ai/open-api.module';
import { GoogleAiApiModule } from './google/google-ai-api.module';

dotenv.config();

@Module({
  imports: [OpenApiModule, GoogleAiApiModule],
  providers: [AppService],
})
export class AppModule {}
