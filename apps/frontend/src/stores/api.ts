import axios from 'axios';
import { authStore } from './authStore';
import { errorStore } from './errorStore';
import { BACKEND_URL } from './constants';

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const message = error.response.data.error || 'Server error';
      errorStore.setError(message);
    } else {
      errorStore.setError('Network issue');
    }
    return Promise.reject(error);
  }
);
