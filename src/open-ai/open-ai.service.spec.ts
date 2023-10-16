import { OpenAiService } from './open-ai.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let o: OpenAiService;

beforeAll(() => {
  o = new OpenAiService();
});

describe('test open ai service', () => {
  it('should ', async function () {
    const r = await o.callOpenAiTest();
    console.log(r);
    expect(r).toHaveLength(18);
  });
});
