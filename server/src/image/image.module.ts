import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../database/entities/Image';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    CommentModule,
    TypeOrmModule.forFeature([ Image ]),
  ],
  providers: [ ImageService ],
  controllers: [ ImageController ],
  exports: [ ImageService ]
})
export class ImageModule{}