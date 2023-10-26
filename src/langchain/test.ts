import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import process from 'process';

const apiKey = process.env.OPEN_AI_API_KEI;

const llm = new OpenAI({
  temperature: 0.9,
  openAIApiKey: apiKey,
});

async function main() {
  const chatModel = new ChatOpenAI({
    openAIApiKey: apiKey,
  });

  const text =
    'What would be a good company name for a company that makes colorful socks?';

  const llmResult = await llm.predict(text);
  /*
              "Feetful of Fun"
            */

  console.log(llmResult);

  const chatModelResult = await chatModel.predict(text);
  /*
              "Socks O'Color"
            */

  console.log(chatModelResult);
}

main();

const a = [
  {
    title: 'Baidu Inc: Investor Overview',
    link: 'https://ir.baidu.com/',
    snippet:
      "The Investor Relations website contains information about Baidu Inc 's business for stockholders, potential investors, and financial analysts.",
  },
  {
    title: 'Baidu - Wikipedia',
    link: 'https://en.wikipedia.org/wiki/Baidu',
    snippet:
      'Baidu, Inc is a Chinese multinational technology company specializing in Internet-related services, products, and artificial intelligence (AI), ...',
  },
  {
    title: 'Company Overview | Baidu Inc',
    link: 'https://ir.baidu.com/company-overview',
    snippet:
      'Founded in 2000 as a search engine platform, we were an early adopter of artificial intelligence in 2010 to make content discovery on the internet easier. We ...',
  },
  {
    title: 'Baidu: What It Is, What It Does, History, Stock, Vs. Google',
    link: 'https://www.investopedia.com/terms/b/baidu.asp',
    snippet:
      'What Is Baidu? Baidu is the dominant internet search engine company in China. Its features and services are similar to those of Google, but its focus is on ...',
  },
  {
    title: 'What is Baidu? | Definition from TechTarget',
    link: 'https://www.techtarget.com/whatis/definition/Baidu',
    snippet:
      'Baidu is a Chinese technology, internet search and internet services company. The multinational company was founded by Robin Li in 2000 and is headquartered ...',
  },
  {
    title: "25 Facts You Didn't Know About Baidu",
    link: 'https://www.searchenginejournal.com/baidu-facts/336803/',
    snippet:
      "Nov 10, 2021 ... Baidu is more than just a search engine – it's a massive Chinese tech company that specializes in artificial intelligence and internet-related ...",
  },
  {
    title: 'Baidu Research',
    link: 'http://research.baidu.com/',
    snippet:
      'Co-located in Silicon Valley and Beijing, Baidu Research brings together top talents from around the world to focus on future-looking fundamental research in ...',
  },
  {
    title: 'Baidu USA',
    link: 'https://usa.baidu.com/',
    snippet:
      "baidu_usa. About. Baidu USA is one of the R&D centers of Baidu, China's largest search engine provider. Learn More > · Careers. Baidu USA is hiring! Join our ...",
  },
  {
    title: 'Baidu, Inc. | LinkedIn',
    link: 'https://www.linkedin.com/company/baidu-inc',
    snippet:
      'Baidu was founded in 2000 by Internet pioneer Robin Li, creator of visionary search technology Hyperlink Analysis, with the mission of providing people with ...',
  },
  {
    title: 'Exploring Baidu Brain 6.0: Updated PaddlePaddle, 2nd-Gen AI ...',
    link: 'http://research.baidu.com/Blog/index-view?id=147',
    snippet:
      "Sep 24, 2020 ... Join us for a quick look at Baidu Brain 6.0, including new updates in Baidu's deep learning platform PaddlePaddle, AI processor Kunlun, core AI ...",
  },
];
