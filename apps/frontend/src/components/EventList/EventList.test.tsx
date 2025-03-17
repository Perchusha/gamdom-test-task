import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventList } from './index';

vi.mock('../../stores', () => ({
  eventStore: {
    events: [
      { event_id: 1, event_name: 'Test Event', odds: 1.5 },
      { event_id: 2, event_name: 'Another Event', odds: 2.0 },
    ],
    fetchEvents: vi.fn(),
  },
}));

describe('EventList', () => {
  it('fetches and displays a list of events', () => {
    render(<EventList />);
    expect(screen.getByText(/Event List/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Event/i)).toBeInTheDocument();
  });

  it('opens the bet modal when clicking "Place Bet"', async () => {
    render(<EventList />);
    const placeBetButton = screen.getAllByRole('button', { name: /Place Bet/i })[0];

    await userEvent.click(placeBetButton);

    expect(await screen.findByText(/Place a Bet/i)).toBeInTheDocument();
  });

  it('closes the bet modal when onClose is triggered', async () => {
    render(<EventList />);
    const placeBetButton = screen.getAllByRole('button', { name: /Place Bet/i })[0];

    await userEvent.click(placeBetButton);

    const modal = await screen.findByRole('dialog');

    expect(modal).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
