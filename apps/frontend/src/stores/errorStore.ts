import { makeAutoObservable } from 'mobx';
import { enqueueSnackbar } from 'notistack';

class ErrorStore {
  constructor() {
    makeAutoObservable(this);
  }

  setError(message: string) {
    enqueueSnackbar(message, { variant: 'error' });
  }
}

export const errorStore = new ErrorStore();
