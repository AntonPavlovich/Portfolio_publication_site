import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Image } from './Image';
import { User } from './User';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 500
  })
  body: string

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

  @ManyToOne(type => Image, {
    nullable: false
  })
  @JoinColumn({
    name: 'imageId'
  })
  image: Image

  @ManyToOne(type => User, {
    nullable: false
  })
  @JoinColumn({
    name: 'userId'
  })
  user: User

}