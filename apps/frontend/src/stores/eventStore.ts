import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { api } from './api';
import { BACKEND_URL } from './constants';
import { Event } from './types';
import { errorStore } from './errorStore.ts';

class EventStore {
  events: Event[] = [];
  socket = io(BACKEND_URL);

  constructor() {
    makeAutoObservable(this);
    this.socket.on('event_update', (updatedEvents: Event[]) => {
      this.events = updatedEvents;
    });
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
