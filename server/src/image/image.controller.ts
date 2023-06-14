import { Controller, Delete, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}

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