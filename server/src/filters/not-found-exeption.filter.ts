import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExeptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log('triggered!')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'Not found!'
      })
  }
}