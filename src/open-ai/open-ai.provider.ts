import { Provider } from '@nestjs/common';
import OpenAI from 'openai';
import process from 'process';

const apiKey = process.env.OPEN_AI_API_KEI;
const openAi = new OpenAI({ apiKey: apiKey });

export const OpenAiProvider: Provider = {
  provide: 'OpenAi',
  useValue: openAi,
};
