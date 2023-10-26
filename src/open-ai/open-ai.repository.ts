import { Inject, Injectable } from '@nestjs/common';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';
import OpenAI from 'openai/index';

@Injectable()
export class OpenAiRepository {
  constructor(@Inject('OpenAi') private readonly openai: OpenAI) {}

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

    return await this.callOpenAiWithFewShotPrompts(fewShotPrompt);
  }

  async callOpenAiWithFewShotPrompts(prompts: FewShotPrompt) {
    try {
      const messages: Array<ChatCompletionMessageParam> = prompts.prompts.map(
        (p) => ({
          role: p.role,
          content: p.content,
        }),
      );
      const chatCompletion = await this.openai.chat.completions.create({
        messages: messages,
        model: 'gpt-4',
        max_tokens: 500,
      });

      return chatCompletion.choices[0].message.content;
    } catch (e) {
      console.error(e);
    }
  }

  async getCapitalOfACountry(country: string) {
    const prompts: FewShotPrompt = new FewShotPrompt();
    prompts.prompts = [
      { role: 'system', content: 'reply with only a word' },
      { role: 'user', content: 'what is the capital of China?' },
      { role: 'assistant', content: 'Beijing' },
      { role: 'user', content: 'what is the capital of canada?' },
      { role: 'assistant', content: 'Ottawa' },
      { role: 'user', content: `what is the capital of ${country}?` },
    ];

    try {
      const messages: Array<ChatCompletionMessageParam> = prompts.prompts.map(
        (p) => ({
          role: p.role,
          content: p.content,
        }),
      );
      const chatCompletion = await this.openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0,
      });

      return chatCompletion.choices[0].message.content;
    } catch (e) {
      console.error(e);
    }
  }
}

interface RolePrompt {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class FewShotPrompt {
  prompts: RolePrompt[];
}
