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
          prompt: 'what is capital of france, response in json',
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
      const chatCompletion = await openai.chat.completions.create({
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

// EG prompts
