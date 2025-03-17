// @ts-ignore
import request from 'supertest';
import { app } from '../src/app';

describe('Bets API', () => {
  it('should return 401 for unauthorized bet placement', async () => {
    const res = await request(app).post('/api/bets').send({ amount: 50, event_id: 1 });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });
});
