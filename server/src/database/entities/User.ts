import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    nullable: false
  })
  hashedPassword: string

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