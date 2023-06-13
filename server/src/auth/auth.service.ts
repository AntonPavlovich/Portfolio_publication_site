import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/loginDto';
import { SignUpDto } from './dto/signUpDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  login(loginDto: LoginDto){
    return true
  }

  signUp(signUpDto: SignUpDto){
    return signUpDto;
  }

  signOut(){}


}