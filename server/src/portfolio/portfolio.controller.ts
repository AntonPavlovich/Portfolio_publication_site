import { Body, Controller, Delete, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/CreatePortfolioDto';
import { UpdatePortfolioDto } from './dto/UpdatePortfolioDto';
import { PortfolioService } from './portfolio.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService
  ) {}

  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImagesToPortfolio(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') portfolioId
  ){
    try {

      for (let file of files){
        await this.portfolioService.saveImageRecord(file, portfolioId)
      }
      return {
        status: 'Success'
      }
    } catch (ex) {
      throw new Error(ex)
    }
  }

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