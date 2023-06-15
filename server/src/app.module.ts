import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthTokenGuard } from './guards/authToken.guard';

import dataSource from './database/dataSource';
import * as path from 'path';

@Module({
  imports: [
    AuthModule,
    TokenModule,
    UserModule,
    PortfolioModule,
    ImageModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      exclude: [ '/(.*)/(.*)' ],
      serveStaticOptions: {
        index: false,
      }
    }),
    CacheModule.register({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...dataSource.options
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
