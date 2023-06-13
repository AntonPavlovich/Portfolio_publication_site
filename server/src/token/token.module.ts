import { Module } from '@nestjs/common';
import { CacheService } from '../services/cache.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [ JwtModule.register({}) ],
  providers: [
    CacheService,
    TokenService,
    JwtService
  ],
  controllers: [],
  exports: [ TokenService ]
})
export class TokenModule {}