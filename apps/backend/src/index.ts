import { createServer } from 'http';
import { app } from './app';
import AppDataSource from './db';

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => console.log('📦 Connected to PostgreSQL!'))
  .catch(error => console.error('🔥 Database connection failed:', error));

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
