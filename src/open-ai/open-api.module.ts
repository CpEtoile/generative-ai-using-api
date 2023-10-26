import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import { OpenAiProvider } from './open-ai.provider';
import { OpenAiRepository } from './open-ai.repository';

@Module({
  imports: [], // Add this line
  controllers: [OpenAiController],
  providers: [OpenAiService, OpenAiProvider, OpenAiRepository],
})
export class OpenApiModule {}
