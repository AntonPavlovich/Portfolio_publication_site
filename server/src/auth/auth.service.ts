import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/loginDto';
import { SignUpDto } from './dto/signUpDto';
import { HashService } from '../services/hash.service';
import { User } from '../database/entities/User';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private hashService: HashService,
    private tokenService: TokenService
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

  async refreshTokens( refreshToken ) {
    const {  id, email } = await this.tokenService.verifyRefreshToken(refreshToken);
    return this.tokenService.signTokenPair({ id, email })
  }

  async verifyAccess( token: string ) {
    return this.tokenService.verifyAccessToken(token)
  }

  login(user: User){
    return this.tokenService.signTokenPair({
      id: user.id,
      email: user.email
    })
  }

  async signUp(signUpDto: SignUpDto){
    const { email } = signUpDto;
    const user = await this.usersService.findOneByEmail(email);
    if( user ){
      throw new BadRequestException('This email is already taken!')
    }
    return this.usersService.create(signUpDto)
  }

  async signOut(){
    await this.tokenService.deleteTokenPair();
  }

}