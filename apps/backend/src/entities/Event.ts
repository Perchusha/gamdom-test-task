import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bet } from './Bet';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  event_id!: number;

  @Column()
  event_name!: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  odds!: number;

  @OneToMany(() => Bet, bet => bet.event)
  bets!: Bet[];
}
