import { Container, Grid2, Typography } from '@mui/material';
import { EventList, BetHistory } from '../../components';

export const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sports Betting Dashboard
      </Typography>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <EventList />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <BetHistory />
        </Grid2>
      </Grid2>
    </Container>
  );
};
