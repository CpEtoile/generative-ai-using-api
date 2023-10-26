import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenAiService } from './open-ai.service';

export class FewShotPrompt {
  prompts: RolePrompt[];
}

@ApiTags('open-ai')
@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('test')
  async testOpenAiApi(): Promise<string> {
    return await this.openAiService.callOpenAiTest();
  }

  @Get('single-form/:noun')
  @ApiOperation({
    summary: 'Get the singular form of a word',
    description: 'For all languages',
  })
  async callOpenAiApi(@Param('noun') noun: string): Promise<string> {
    return await this.openAiService.getSingleFormOfANoun(noun);
  }

  @Post('few-shot-prompting')
  @ApiBody({ type: FewShotPrompt })
  async fewShotPrompting(@Body() prompts: FewShotPrompt): Promise<string> {
    return await this.openAiService.callOpenAiWithFewShotPrompts(prompts);
  }

  @Get('capital-of-a-country/:country')
  async getCapitalOfACountry(
    @Param('country') country: string,
  ): Promise<string> {
    return await this.openAiService.getCapitalOfACountry(country);
  }

  @Get('list-google-api-end-points')
  async getGoolgeApiEndPoints(
    @Param('country') country: string,
  ): Promise<string> {
    return await this.openAiService.getCapitalOfACountry(country);
  }
}

interface RolePrompt {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
