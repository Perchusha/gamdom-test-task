import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventsRouter from './routes/events';
import betsRouter from './routes/bets';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/bets', betsRouter);
app.use('/api/events', eventsRouter);

export { app };
