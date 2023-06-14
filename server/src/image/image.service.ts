import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../database/entities/Image';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async deleteImageRecord(imageId: number){
    const imageEntity = await this.imageRepository.findOne({
      where: {
        id: imageId
      }
    })

    if( imageEntity ){
      const { url } = imageEntity;
      await this.imageRepository.remove(imageEntity);
      await fs.unlink(path.join(__dirname, '..', '..', url))
    }
  }

}