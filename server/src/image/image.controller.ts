import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateCommentDto } from '../comment/dto/CreateCommentDto';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}

  @Get('feed')
  getFeed(
    @Req() req
  ){
    const { query: { limit, offset } } = req;
    const fullUrl = process.env.APP_HOST || `http://localhost:${process.env.APP_PORT}/`
    return this.imageService.getFeed(limit, offset, fullUrl)
  }

  @Post(':id/new-comment')
  async addCommentToImage(
    @Param('id') imageId,
    @Req() req
  ){
    const { body: { body }, user } = req;
    try {
      await this.imageService.addCommentToImage({
        userId: user.id,
        imageId: imageId,
        body
      })
      return {
        status: 'Success'
      }
    } catch (ex) {
      throw new Error(ex)
    }
  }

  @Delete(':id')
  async deleteImage(
    @Param('id') imageId
  ){
    try {
      await this.imageService.deleteImageRecord(imageId)
    } catch (ex) {
      throw new Error(ex)
    }
  }
}