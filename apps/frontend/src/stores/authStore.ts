import { makeAutoObservable } from 'mobx';
import { api } from './api';
import { errorStore } from './errorStore';
import { BACKEND_URL } from './constants';

class AuthStore {
  token: string | null = localStorage.getItem('token');

  constructor() {
    makeAutoObservable(this);
  }

  async login(username: string, password: string) {
    try {
      const response = await api.post(`${BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });
      this.token = response.data.token;
      localStorage.setItem('token', this.token ?? '');
    } catch (error) {
      errorStore.setError('Login failed');
    }
  }

  async register(username: string, password: string) {
    try {
      await api.post(`${BACKEND_URL}/api/auth/register`, { username, password });
      await this.login(username, password);
    } catch (error) {
      errorStore.setError('Registration failed');
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  get isAuthenticated() {
    return !!this.token;
  }
}

export const authStore = new AuthStore();
