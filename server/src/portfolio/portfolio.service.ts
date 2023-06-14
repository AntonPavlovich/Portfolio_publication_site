import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../database/entities/Portfolio';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { TokenPayload } from '../token/config/config';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';


@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>
  ) {}

  async create(createPorfolioDto: CreatePortfolioDto, userid: number): Promise<Partial<Portfolio> & { userId: number }>{
    const portfolio = await this.portfolioRepository.create(
      {
        ...createPorfolioDto,
        user: { id: userid }
      })
    await this.portfolioRepository.save(portfolio)
    const { name, description, user: { id } } = portfolio;

    return {
      name, description, userId: id
    };

  }

  async update(updatePortfolioDto: UpdatePortfolioDto, id: number){
    return this.portfolioRepository.update( { id } , updatePortfolioDto )
  }

  delete(id: number){
    return this.portfolioRepository.delete({ id })
  }

}