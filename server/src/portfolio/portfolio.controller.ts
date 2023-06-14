import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService
  ) {}

  @Post('new')
  createRepository(
    @Req() req,
    @Body() createPortfolioDto: CreatePortfolioDto
  ){
    const { user } = req;
    return this.portfolioService.create(createPortfolioDto, user.id)
  }

  @Post('update/:id')
  async updateRepository(
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @Param('id') portfolioId
  ){
    return await this.portfolioService.update(updatePortfolioDto, portfolioId)
  }

  @Delete(':id')
  async deleteRepository(
    @Param('id') portfolioId
  ){
    return this.portfolioService.delete(portfolioId)
  }
}