import { Router } from 'express';
import { Server } from 'socket.io';
import { Bet, Event, User } from '../entities';
import AppDataSource from '../db';
import { authMiddleware, AuthRequest } from './auth';

const router = Router();
let io: Server;

export function setBetSocket(ioInstance: Server) {
  io = ioInstance;
}

const broadcastBets = async () => {
  try {
    const bets = await AppDataSource.getRepository(Bet).find({
      relations: ['event', 'user'],
      select: {
        user: {
          user_id: true,
          username: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });
    if (io) {
      io.emit('bet_update', bets);
    }
  } catch (error) {
    console.error('Error broadcasting bets:', error);
  }
};

router.get('/', async (_req, res) => {
  try {
    const bets = await AppDataSource.getRepository(Bet).find({
      relations: ['event', 'user'],
      select: {
        user: {
          user_id: true,
          username: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });

    res.json(bets);
  } catch (error) {
    console.error('Error fetching bets:', error);
    res.status(500).json({ error: 'Failed to fetch bets' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { amount, event_id } = req.body;

    if (!amount || !event_id) {
      res.status(400).json({ error: 'Amount and event_id are required' });
      return;
    }

    if (amount <= 0) {
      res.status(400).json({ error: 'Bet amount must be greater than zero' });
      return;
    }

    const event = await AppDataSource.getRepository(Event).findOneBy({ event_id });
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    console.log('🔹 User in request:', req.user);

    const user = await AppDataSource.getRepository(User).findOne({
      where: { user_id: (req.user as any).userId },
    });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    console.log('✅ Found user in DB:', user);

    const bet = AppDataSource.getRepository(Bet).create({ amount, event, user });
    await AppDataSource.getRepository(Bet).save(bet);

    broadcastBets().catch(err => console.error('Error in broadcastBets:', err));

    res.status(201).json(bet);
  } catch (error) {
    console.error('Error creating bet:', error);
    res.status(500).json({ error: 'Failed to create bet' });
  }
});

export default router;
