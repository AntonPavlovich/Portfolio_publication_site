import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if( this.isUnprotectedRoute(request.url) ){
      return true;
    }

    const token = request.headers['authentication'];
    if( !token ){
      throw new UnauthorizedException();
    }
    try {
      request.user = await this.authService.verifyAccess(token.replace('Bearer ', ''));

      return request.user.email && request.user.id;
    } catch (ex) {
      throw new UnauthorizedException(ex.message);
    }
  }

  private isUnprotectedRoute(url) {
    const unprotected = ['/auth/login', '/auth/sign-up', '/feed', '/auth/refresh']
    return unprotected.includes(url);
  }
}