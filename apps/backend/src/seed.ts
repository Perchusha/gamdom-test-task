import bcrypt from 'bcryptjs';
import AppDataSource from './db';
import { User, Event, Bet } from './entities';

const seedDatabase = async () => {
  await AppDataSource.initialize();

  console.log('🧹 Cleaning database...');
  await AppDataSource.getRepository(Bet).delete({});
  await AppDataSource.getRepository(Event).delete({});
  await AppDataSource.getRepository(User).delete({});

  console.log('✅ Database cleaned. Seeding new data...');

  const userRepo = AppDataSource.getRepository(User);
  const eventRepo = AppDataSource.getRepository(Event);
  const betRepo = AppDataSource.getRepository(Bet);

  const usersData = [
    { username: 'alice', password: await bcrypt.hash('password123', 10) },
    { username: 'bob', password: await bcrypt.hash('securepass', 10) },
    { username: 'charlie', password: await bcrypt.hash('charliepass', 10) },
    { username: 'diana', password: await bcrypt.hash('dianapass', 10) },
    { username: 'edward', password: await bcrypt.hash('edwardpass', 10) },
  ];
  const users = await userRepo.save(usersData);

  const eventsData = [
    { event_name: 'Soccer: Team A vs. Team B', odds: 1.75 },
    { event_name: 'Basketball: Team C vs. Team D', odds: 2.1 },
    { event_name: 'Tennis: Player X vs. Player Y', odds: 1.5 },
    { event_name: 'MMA: Fighter 1 vs. Fighter 2', odds: 2.25 },
    { event_name: 'Hockey: Team E vs. Team F', odds: 1.85 },
  ];
  const events = await eventRepo.save(eventsData);

  const betsData = [
    { amount: 50, event: events[0], user: users[0] },
    { amount: 30, event: events[1], user: users[1] },
    { amount: 75, event: events[2], user: users[2] },
    { amount: 100, event: events[3], user: users[3] },
    { amount: 25, event: events[4], user: users[4] },
  ];
  await betRepo.save(betsData);

  console.log('✅ Seed data added');
  process.exit();
};

seedDatabase().catch(error => console.error('🔥 Seed error:', error));
