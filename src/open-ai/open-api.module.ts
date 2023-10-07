import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';

@Module({
  imports: [], // Add this line
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenApiModule {}
