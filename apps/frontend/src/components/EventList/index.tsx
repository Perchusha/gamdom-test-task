import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { eventStore } from '../../stores';
import { BetModal } from '../BetModal';

type SelectedEventState = {
  id: number;
  name: string;
};

export const EventList = observer(() => {
  const [betModalOpen, setBetModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventState | null>(null);

  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  const handleOpenBetModal = (eventId: number, eventName: string) => {
    setSelectedEvent({ id: eventId, name: eventName });
    setBetModalOpen(true);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Event List
      </Typography>
      {eventStore.events.map(event => (
        <Card key={event.event_id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{event.event_name}</Typography>
            <Typography variant="body1">Odds: {event.odds}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenBetModal(event.event_id, event.event_name)}
              sx={{ mt: 2 }}
            >
              Place Bet
            </Button>
          </CardContent>
        </Card>
      ))}

      {selectedEvent && selectedEvent.id && selectedEvent.name ? (
        <BetModal
          open={betModalOpen}
          onClose={() => setBetModalOpen(false)}
          eventId={selectedEvent.id}
          eventName={selectedEvent.name}
        />
      ) : null}
    </div>
  );
});
