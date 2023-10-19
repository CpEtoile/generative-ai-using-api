import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleVertexService } from './google-vertex.service';

@ApiTags('google-ai')
@Controller('google-AI')
export class GoogleAiController {
  constructor(private readonly googleVertexService: GoogleVertexService) {}

  @Get('listEndPoints')
  async testOpenAiApi(): Promise<string> {
    return await this.googleVertexService.listEndpoints();
  }
}
