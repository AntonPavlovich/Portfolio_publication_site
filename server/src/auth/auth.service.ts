import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/loginDto';
import { SignUpDto } from './dto/signUpDto';
import { HashService } from '../services/hash.service';
import { User } from '../database/entities/User';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private hashService: HashService
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<User | null>{
    const user = await this.usersService.findOneByEmail(email);
    if( user ) {
      const isMatch = await this.hashService.compare(password, user.hashedPassword)
      if ( isMatch ) {
        return user;
      }
    }
    return null;
  }

  login(loginDto: LoginDto){
    return true
  }

  async signUp(signUpDto: SignUpDto){
    const { email } = signUpDto;
    const user = await this.usersService.findOneByEmail(email);
    if( user ){
      throw new BadRequestException('This email is already taken!')
    }
    return this.usersService.create(signUpDto)
  }

  signOut(){}


}