import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from '../database/entities/Portfolio';
import { MulterModule } from '@nestjs/platform-express';
import { Image } from '../database/entities/Image';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([ Portfolio, Image ]),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}