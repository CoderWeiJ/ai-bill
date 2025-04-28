import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors'

import dotenv from 'dotenv';

import chatRoutes from './src/routes/chatRoutes'
import recordRoutes from './src/routes/recordRoutes'
import './src/db'
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 8000;


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/chat', chatRoutes)
app.use('/record', recordRoutes)

app.listen({ port }, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});