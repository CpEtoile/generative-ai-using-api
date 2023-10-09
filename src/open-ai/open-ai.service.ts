import axios from 'axios';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { FewShotPrompt } from './open-ai.controller';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';

const apiKey = process.env.OPEN_AI_API_KEI;
const openai = new OpenAI({ apiKey: apiKey });

@Injectable()
export class OpenAiService {
  async getSingleFormOfANoun(noun: string): Promise<string> {
    const prompt = `Quest ce que c'est la form singulier du mot ${noun}, retourne sous format JSON`; // Your input prompt

    try {
      const authorization = `Bearer ${apiKey}`;
      console.log(authorization);
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        },
      );

      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
    }
  }

  async callOpenAiTest(): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.6,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
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

  async callOpenAiWithFewShotPrompts(prompts: FewShotPrompt) {
    console.log(prompts);

    try {
      const messages: Array<ChatCompletionMessageParam> = prompts.prompts.map(
        (p) => ({
          role: p.role,
          content: p.content,
        }),
      );
      const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo-16k-0613',
        // max_tokens: 100,
      });

      return chatCompletion.choices[0].message.content;
    } catch (e) {
      console.error(e);
    }
  }
}

// EG prompts
// { role: 'system', content: 'You are a helpful assistant.' },
// { role: 'user', content: 'Who won the world series in 2020?' },
// { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
// { role: 'user', content: 'Where was it played?' }
