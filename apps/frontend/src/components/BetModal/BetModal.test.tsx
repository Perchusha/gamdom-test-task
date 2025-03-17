import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BetModal } from './index';
import { betStore, errorStore } from '../../stores';
import '@testing-library/jest-dom';

vi.mock('../../stores', () => ({
  betStore: {
    placeBet: vi.fn(),
  },
  errorStore: {
    setError: vi.fn(),
  },
}));

describe('BetModal', () => {
  const mockOnClose = vi.fn();

  const setup = (open = true) => {
    render(<BetModal open={open} onClose={mockOnClose} eventId={1} eventName="Test Event" />);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal with event name', () => {
    setup();
    expect(screen.getByText(/Place a Bet/i)).toBeInTheDocument();
    expect(screen.getByText(/Event: Test Event/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bet Amount/i)).toBeInTheDocument();
  });

  it('allows entering a bet amount', async () => {
    setup();
    const input = screen.getByLabelText(/Bet Amount/i) as HTMLInputElement;

    await userEvent.type(input, '50');
    expect(input.value).toBe('50');
  });

  it('shows an error for invalid bet amounts', async () => {
    setup();
    const placeBetButton = screen.getByRole('button', { name: /Place Bet/i });

    await userEvent.click(placeBetButton);
    expect(errorStore.setError).toHaveBeenCalledWith('Please enter a valid bet amount.');
  });

  it('places a bet with a valid amount', async () => {
    setup();
    const input = screen.getByLabelText(/Bet Amount/i);
    const placeBetButton = screen.getByRole('button', { name: /Place Bet/i });

    await userEvent.type(input, '100');
    await userEvent.click(placeBetButton);

    expect(betStore.placeBet).toHaveBeenCalledWith(100, 1);
    expect(betStore.placeBet).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles failed bet placement', async () => {
    (betStore.placeBet as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Failed'));

    setup();
    const input = screen.getByLabelText(/Bet Amount/i);
    const placeBetButton = screen.getByRole('button', { name: /Place Bet/i });

    await userEvent.type(input, '100');
    await userEvent.click(placeBetButton);

    expect(errorStore.setError).toHaveBeenCalledWith('Failed to place bet');
  });

  it('closes the modal when cancel is clicked', async () => {
    setup();
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });

    await userEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
