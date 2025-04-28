
import express, { Request, Response } from 'express';
import { getRecords, type RecordModel } from '../db/schema'

const router = express.Router();



router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id: userId, date } = req.body;    
    if (userId == null || date == null) {
      res.status(401).json({ status: 401, message: '非法参数' })
      return;
    }
    const records = await getRecords(userId, date);    
    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
});



export default router;