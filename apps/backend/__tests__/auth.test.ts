// @ts-ignore
import request from 'supertest';
import { app } from '../src/app';

describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
