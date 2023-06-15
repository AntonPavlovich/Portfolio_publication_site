import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../database/entities/Comment'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async createComment({ userId, imageId,  body }){
    const commentEntity = await this.commentRepository.create({
      user: { id: userId },
      image: { id: imageId },
      body
    })
    await this.commentRepository.save(commentEntity)
  }

  async deleteComment(commentId) : Promise<void>{
    const commentRecord = await this.commentRepository.findOne({
      where: { id: commentId }
    })
    await this.commentRepository.remove(commentRecord)
  }

  editComment(){}

}