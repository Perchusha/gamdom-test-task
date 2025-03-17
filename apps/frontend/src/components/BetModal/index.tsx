import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Typography,
} from '@mui/material';
import { betStore, errorStore } from '../../stores';
import { BetModalProps } from './types';

export const BetModal = observer(({ open, onClose, eventId, eventName }: BetModalProps) => {
  const [betAmount, setBetAmount] = useState<string>('');

  const handlePlaceBet = async () => {
    if (!betAmount || isNaN(Number(betAmount))) {
      errorStore.setError('Please enter a valid bet amount.');
      return;
    }

    try {
      await betStore.placeBet(Number(betAmount), eventId);
      setBetAmount('');
      onClose();
    } catch (error) {
      errorStore.setError('Failed to place bet');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Place a Bet</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Event: {eventName}</Typography>
        <TextField
          label="Bet Amount"
          type="number"
          fullWidth
          value={betAmount}
          onChange={e => setBetAmount(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handlePlaceBet} color="primary" variant="contained">
          Place Bet
        </Button>
      </DialogActions>
    </Dialog>
  );
});
