import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText, pipeDataStreamToResponse, streamText } from 'ai';
import express, { Request, Response } from 'express';

import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

const deepSeek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
})

router.post('/', async (req: Request, res: Response) => {
  const result = await generateText({
    model: deepSeek('deepseek-chat'),
    prompt: 'hello',
  });
  res.json(result);
  return;
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