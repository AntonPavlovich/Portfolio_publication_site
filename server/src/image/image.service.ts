import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../database/entities/Image';
import { Repository } from 'typeorm';
import { Portfolio } from '../database/entities/Portfolio';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async getFeed(limit = 100, offset = 0, hostname: string){
    const images = await this.imageRepository.query(`
        select
            $3 || url as "url",
            img.description,
            port.name
        from images img
            join portfolios port on port.id = img."portfolioId"
        order by img."createdAt"
        limit $1 offset $2;
    `, [ limit, offset, hostname ] )
    return images;
  }

  async createImageRecord(
    image: Express.Multer.File & Partial<{ description: string }>,
    portfolio: Portfolio
  ){
    const {
      originalname : originalFileName,
      filename: name,
      path: url,
      description
    } = image;

    const imageEntity = this.imageRepository.create({
      name,
      description,
      url,
      originalFileName,
      portfolio
    })

    return this.imageRepository.save(imageEntity)
  }

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