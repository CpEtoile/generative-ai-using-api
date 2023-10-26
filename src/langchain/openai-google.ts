import process from 'process';
import { AgentExecutor, ZeroShotAgent } from 'langchain/agents';
import { ConversationSummaryBufferMemory } from 'langchain/memory';
import { OpenAI } from 'langchain/llms/openai';

import { LLMChain } from 'langchain/chains';
import { GoogleCustomSearch, Tool } from 'langchain/tools';

const googleCseId = process.env.GOOGLE_CSE_ID;
const googleApiKey = process.env.GOOGLE_API_KEY;
const openApiKey = process.env.OPEN_AI_API_KEI;
const openAi = new OpenAI({ openAIApiKey: openApiKey, temperature: 0 });

async function main() {
  const googleSearch = new GoogleCustomSearch({
    apiKey: googleApiKey,
    googleCSEId: googleCseId,
  });

  const tools: Array<Tool> = [googleSearch];

  const prefix = `Have a conversation with a human, answering the following questions as best you can. You have access to the following tools:`;
  const suffix = `Begin!"
{chat_history}
Question: {input}
{agent_scratchpad}`;

  const prompt = ZeroShotAgent.createPrompt(tools, {
    prefix,
    suffix,
    inputVariables: ['input', 'chat_history', 'agent_scratchpad'],
  });

  const memory = new ConversationSummaryBufferMemory({
    memoryKey: 'chat_history',
    llm: openAi,
  });

  const llmChain = new LLMChain({
    llm: openAi,
    prompt,
  });
  const agent = new ZeroShotAgent({
    llmChain,
    allowedTools: tools.map((tool) => tool.name),
  });

  const agent_chain = AgentExecutor.fromAgentAndTools({
    agent,
    tools,
    verbose: true,
    memory,
  });
  const result = await agent_chain.run('which team gain world cup 2022');
  console.log('*******************************************');
  console.log(result);
  console.log('*******************************************');
}

// const agentWithoutMemory = AgentExecutor.fromAgentAndTools({
//   agent,
//   tools,
//   verbose: true,
// });
main();
