import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/loginDto';
import { SignUpDto } from './dto/signUpDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService
  ) {}

  login(loginDto: LoginDto){
    return true
  }

  signUp(signUpDto: SignUpDto){
    return signUpDto;
  }

  signOut(){}


}