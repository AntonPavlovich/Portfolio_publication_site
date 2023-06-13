import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

}