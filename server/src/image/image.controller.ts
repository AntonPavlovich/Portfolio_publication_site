import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadFile(@UploadedFiles() files){
    const response = {
      amount: files.length,
      uploaded: 0,
      errors: []
    }

    for ( let file of files ){
        try {
          await this.imageService.createImageRecord(file)
          response.uploaded++
        } catch (ex) {
          response.errors.push(ex)
          console.error(ex)
        }
    }

    return response;
  }
}