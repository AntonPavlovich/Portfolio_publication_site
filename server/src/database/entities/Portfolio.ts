import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200
  })
  name: string

  @Column({
    length: 500
  })
  description: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updated_at: Date;

  @ManyToOne(() => User, {
    cascade: [ 'update' ],
    nullable: false
  })
  @JoinColumn({
    name: 'userId'
  })
  user: User
}