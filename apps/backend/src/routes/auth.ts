import { Request, Response, NextFunction, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities';
import AppDataSource from '../db';

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export type AuthRequest = Request & {
  user?: { userId: number; username: string };
};

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    const userRepo = AppDataSource.getRepository(User);
    const existingUser = await userRepo.findOneBy({ username });

    if (existingUser) {
      res.status(409).json({ error: 'Username already taken' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword });
    await userRepo.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { username },
      select: ['user_id', 'username', 'password'],
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ userId: user.user_id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; username: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default router;
