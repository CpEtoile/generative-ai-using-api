import axios from "axios";
import { Injectable } from "@nestjs/common";

const apiKey = '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'; // Replace with your actual API key


@Injectable()
export class OpenAiService {
  async getSingleFormOfANoun(noun: string): Promise<string> {
    const prompt = `Quest ce que c'est la form singulier du mot ${noun}, retourne sous format JSON`; // Your input prompt

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
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
    }
  }


}
