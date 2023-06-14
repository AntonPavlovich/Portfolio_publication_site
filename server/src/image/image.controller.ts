import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}

  @Post(':id/new-comment')
  async addCommentToImage(
    @Param("id") imageId,
    @Body() body
  ){
    
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