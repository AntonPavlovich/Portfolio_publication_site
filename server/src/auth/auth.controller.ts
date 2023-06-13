import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { SignUpDto } from './dto/signUpDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginDto: LoginDto ){
    return this.authService.login(loginDto)
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  @Get('sign-out')
  signOut(){}

}