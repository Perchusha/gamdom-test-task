import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Bet, Event, User } from './entities';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'betting_db',
  entities: [Bet, Event, User],
  synchronize: true,
  logging: true,
});

export default AppDataSource;
