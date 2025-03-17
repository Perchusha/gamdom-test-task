import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import eventsRouter, { setEventsSocket } from './routes/events';
import betsRouter, { setBetSocket } from './routes/bets';
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
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

setEventsSocket(io);
setBetSocket(io);

io.on('connection', socket => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
