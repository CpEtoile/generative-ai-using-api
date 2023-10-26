import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { FewShotPrompt } from './open-ai.controller';
import { OpenAiRepository } from './open-ai.repository';
import process from 'process';

@Injectable()
export class OpenAiService {
  constructor(private readonly openAiRepository: OpenAiRepository) {}

  async getSingleFormOfANoun(noun: string): Promise<string> {
    return await this.getSingularFormWordFromFewShotPrompts(noun);
  }

  async callOpenAiTest(): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: 'what is capital of france, response in json',
          max_tokens: 100,
          temperature: 0.6,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEI}`,
          },
        },
      );

      const res = response.data.choices[0].text;
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async getSingularFormWordFromFewShotPrompts(wordInPluralForm: string) {
    const fewShotPrompt: FewShotPrompt = {
      prompts: [
        {
          role: 'system',
          content: 'give singular and minuscule form of the word',
        },
        {
          role: 'user',
          content: 'bananas',
        },
        {
          role: 'assistant',
          content: 'banana',
        },
        {
          role: 'user',
          content: 'Vélos',
        },
        {
          role: 'assistant',
          content: 'vélo',
        },
        {
          role: 'user',
          content: wordInPluralForm,
        },
      ],
    };

    return await this.openAiRepository.callOpenAiWithFewShotPrompts(
      fewShotPrompt,
    );
  }

  async getCapitalOfACountry(country: string) {
    return await this.openAiRepository.getCapitalOfACountry(country);
  }

  async callOpenAiWithFewShotPrompts(prompts: FewShotPrompt) {
    return this.openAiRepository.callOpenAiWithFewShotPrompts(prompts)
  }
}
