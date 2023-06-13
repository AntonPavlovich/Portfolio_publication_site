import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import dataSource from './database/dataSource';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSource.options,
      dataSourceFactory: async (options) => {
        return await dataSource.initialize()
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
