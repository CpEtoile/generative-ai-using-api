import { Module } from '@nestjs/common';
import { GoogleAiController } from './google-ai.controller';
import { GoogleVertexService } from './google-vertex.service';

@Module({
  imports: [], // Add this line
  controllers: [GoogleAiController],
  providers: [GoogleVertexService],
})
export class GoogleAiApiModule {}
