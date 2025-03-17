import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import cors from 'cors';
import eventsRouter from './routes/events';
import betsRouter from './routes/bets';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
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

const server = createServer(app);
server.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
