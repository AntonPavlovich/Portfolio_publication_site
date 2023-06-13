import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { UserService } from './user.service';
import { HashService } from '../services/hash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  providers: [ UserService, HashService ],
  controllers: [],
  exports: [ UserService ]
})
export class UserModule {}
