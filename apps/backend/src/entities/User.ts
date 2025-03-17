import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bet } from './Bet';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Bet, bet => bet.user)
  bets!: Bet[];
}
