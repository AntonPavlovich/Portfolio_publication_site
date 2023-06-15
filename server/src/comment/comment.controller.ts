import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Delete(":id")
  async deleteComment(
    @Param('id') commentId
  ){
    return this.commentService.deleteComment(commentId)
  }
}