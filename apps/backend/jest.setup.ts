import AppDataSource from './src/db';

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
});

afterAll(async () => {
  await AppDataSource.destroy();
});
