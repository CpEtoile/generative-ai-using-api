import process from 'process';

import { GoogleCustomSearch } from 'langchain/tools';

const googleCseId = process.env.GOOGLE_CSE_ID;
const googleApiKey = process.env.GOOGLE_API_KEY;

async function main() {
  const googleSearch = new GoogleCustomSearch({
    apiKey: googleApiKey,
    googleCSEId: googleCseId,
  });

  const g = await googleSearch.call('which team gain world cup 2022?');
  const js = JSON.parse(g);
  console.log('**********');
  console.log(js);
  console.log(js.map((j: { snippet: string }) => j.snippet).slice(0, 2));
  console.log('**********');
}

// const agentWithoutMemory = AgentExecutor.fromAgentAndTools({
//   agent,
//   tools,
//   verbose: true,
// });
main();
