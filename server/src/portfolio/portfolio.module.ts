import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from '../database/entities/Portfolio';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Portfolio ]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}