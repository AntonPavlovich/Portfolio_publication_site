import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthTokenGuard } from './guards/authToken.guard';

import dataSource from './database/dataSource';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    AuthModule,
    TokenModule,
    UserModule,
    PortfolioModule,
    CacheModule.register({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSource.options,
      dataSourceFactory: async (options) => {
        return await dataSource.initialize()
      }
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard
    }
  ],
})
export class AppModule {}
