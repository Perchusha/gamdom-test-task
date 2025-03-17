import { makeAutoObservable } from 'mobx';
import { enqueueSnackbar } from 'notistack';
import { api } from './api';
import { BACKEND_URL } from './constants';
import { Bet } from './types';
import { errorStore } from './errorStore.ts';

class BetStore {
  bets: Bet[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBets() {
    try {
      const response = await api.get<Bet[]>(`${BACKEND_URL}/api/bets`);
      this.bets = response.data;
    } catch (error) {
      errorStore.setError('Failed to fetch bets');
    }
  }

  async placeBet(amount: number, eventId: number) {
    try {
      const response = await api.post('/bets', { amount, event_id: eventId });
      this.bets.unshift(response.data);
      enqueueSnackbar('Bet placed successfully!', { variant: 'success' });
    } catch (error) {
      errorStore.setError('Failed to place bet');
    }
  }
}

export const betStore = new BetStore();
