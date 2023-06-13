import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Get('test')
  test(){
    return 'AUTHENTICATED'
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req ){
    const { user } = req;
    return this.authService.login(user)
  }

  @Post('refresh')
  refresh(@Body() body){
    const { refreshToken } = body;
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  @Get('sign-out')
  signOut(){
    return this.authService.signOut();
  }

}