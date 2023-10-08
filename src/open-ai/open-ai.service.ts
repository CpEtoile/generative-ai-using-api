import axios from 'axios';
import * as process from 'process';
import { Injectable } from '@nestjs/common';

const apiKey = process.env.OPEN_AI_API_KEI;

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
          temperature: 0.1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
          }
        }
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
          temperature: 0.6
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      );

      const res = response.data.choices[0].text;
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
