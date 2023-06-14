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

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  originalFileName: string

  @Column()
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