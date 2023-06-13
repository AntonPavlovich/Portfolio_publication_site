import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/User';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserEntity ])
  ],
  providers: [ UsersService ],
  controllers: []
})
export class UsersModule{}
