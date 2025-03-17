export interface Event {
  event_id: number;
  event_name: string;
  odds: number;
}

export interface User {
  user_id: number;
  username: string;
  password: string;
}

export interface Bet {
  bet_id: number;
  amount: number;
  user_id: number;
  user: User;
  event: Event;
}
