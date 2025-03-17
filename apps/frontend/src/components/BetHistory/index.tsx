import { observer } from 'mobx-react-lite';
import { betStore } from '../../stores';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect } from 'react';

export const BetHistory = observer(() => {
  useEffect(() => {
    betStore.fetchBets();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Bet History
      </Typography>
      {betStore.bets.length === 0 ? (
        <Typography>No bets placed yet.</Typography>
      ) : (
        betStore.bets.map(bet => (
          <Card key={bet.bet_id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6">{bet.event.event_name}</Typography>
              <Typography variant="body1">Bet Amount: ${bet.amount}</Typography>
              <Typography variant="body2">Placed by: {bet.user?.username || 'Unknown'}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
});
