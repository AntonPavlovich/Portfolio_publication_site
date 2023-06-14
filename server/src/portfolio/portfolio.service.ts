import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../database/entities/Portfolio';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
import { ImageService } from '../image/image.service';


@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly imageService: ImageService
  ) {}

  async saveImageRecord(
    image: Express.Multer.File & Partial<{ description: string }>,
    portfolioId: number
  ) : Promise<void> {

    const portfolio = await this.portfolioRepository.findOne({
      where: { id: portfolioId }
    })
    if(!portfolio){
      throw new BadRequestException('There are no such portfolio!')
    }

    await this.imageService.createImageRecord(image, portfolio);

  }

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

  async delete(id: number){
    return this.portfolioRepository.delete({ id })
  }

}