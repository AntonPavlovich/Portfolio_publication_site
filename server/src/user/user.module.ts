import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  providers: [ UserService ],
  controllers: [],
  exports: [ UserService ]
})
export class UserModule {}
