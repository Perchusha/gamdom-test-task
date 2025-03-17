import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Event } from './Event';
import { User } from './User';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  bet_id!: number;

  @Column()
  amount!: number;

  @ManyToOne(() => Event, event => event.bets)
  event!: Event;

  @ManyToOne(() => User, user => user.bets)
  user!: User;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
