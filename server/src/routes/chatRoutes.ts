import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText, pipeDataStreamToResponse, streamText } from 'ai';
import express, { Request, Response } from 'express';
import { createRecord, type RecordModel } from '../db/schema'
import dotenv from 'dotenv'
import { parseResult } from '../utils';

dotenv.config();

const router = express.Router();

const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

router.post('/', async (req: Request, res: Response) => {
  const { messages, user_id: userId } = req.body;
  const today = new Date().toISOString().split('T')[0] // YY-MM-DD
  const prompt = `请你分析一下我的输入，如果是消费或者支出记录，则按照json格式返回，否则正常返回。格式如下：{"amount": 1000, "title": "others", "date": "2025-04-21"}, 规则是：
  1. 如果是消费，则amount是负数，如果是收入，则amount是正数；
  2. 如果是支出，则title是消费的商品或者服务，如果是收入，则title是收入的来源，如果分析不出来，则填others；
  3. 今天是${today}，如果能分析出日期，则date是日期，否则为今天`;

  let resJson = { text: '', records: null as RecordModel | null}

  try {
    const { text } = await generateText({
      model: deepSeek('deepseek-chat'),
      system: prompt,
      messages,
    });
    const result =  parseResult(text) as RecordModel | null;
    if (result) {
      Object.assign(result, { userId })
      // save to db
      console.log (result)
      await createRecord({...result, userId });
      resJson.records = result;      
    } else {
      resJson.text = text;
    }
    res.status(200).json(resJson);
  } catch (error) {
    const message = (error as Error)?.message ?? '';
    if (message === 'Insufficient Balance') {
      resJson = { text: '余额不足', records: null };      
    } else {
      resJson = { text: '服务器异常', records: null };
    }
    res.status(500).json(resJson);
  }  
});

router.post('/stream-data', async (req: Request, res: Response) => {
  // immediately start streaming the response
  pipeDataStreamToResponse(res, {
    execute: async dataStreamWriter => {
      dataStreamWriter.writeData('initialized call');

      const result = streamText({
        model: deepSeek('deepseek-chat'),
        prompt: 'Invent a new holiday and describe its traditions.',
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: error => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });
});



export default router;