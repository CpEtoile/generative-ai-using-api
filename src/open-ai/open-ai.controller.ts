import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { OpenAiService } from './open-ai.service';

@ApiTags('open-ai')
@Controller('single-form')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get(':noun')
  async callOpenAiApi(@Param('noun') noun: string): Promise<string> {
    return await this.openAiService.getSingleFormOfANoun(noun);
  }

  @Get('test')
  async testOpenAiApi(): Promise<string> {
    return await this.openAiService.callOpenAiTest();
  }
}
