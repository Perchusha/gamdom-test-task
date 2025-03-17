import { makeAutoObservable } from 'mobx';
import { api } from './api';
import { BACKEND_URL } from './constants';
import { Event } from './types';
import { errorStore } from './errorStore.ts';

class EventStore {
  events: Event[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    try {
      const response = await api.get<Event[]>(`${BACKEND_URL}/api/events`);
      this.events = response.data;
    } catch (error) {
      errorStore.setError('Failed to fetch events');
    }
  }
}

export const eventStore = new EventStore();
