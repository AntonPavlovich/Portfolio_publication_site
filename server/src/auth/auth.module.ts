import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { HashService } from '../services/hash.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TokenModule
  ],
  providers: [
    AuthService,
    HashService,
    LocalStrategy
  ],
  controllers: [ AuthController ],
  exports: [ AuthService ]
})
export class AuthModule {}
