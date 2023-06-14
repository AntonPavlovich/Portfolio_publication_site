import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Portfolio } from './Portfolio';

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200
  })
  name: string

  @Column({
    nullable: true,
    length: 500
  })
  description: string

  @Column({
    type: 'text'
  })
  originalFileName: string

  @Column({
    type: 'text'
  })
  url: string

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

  @ManyToOne(() => Portfolio, {
    cascade: true,
    nullable: false
  })
  @JoinColumn({
    name: 'portfolioId'
  })
  portfolio: Portfolio
}