import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { LoginDto } from '../auth/dto/loginDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOneByEmail( email: string ): Promise<User>{
    return this.usersRepository.findOne({ where: { email } })
  }

  async create( userDto: LoginDto ): Promise<User>{
    const created = await this.usersRepository.create(userDto);
    return this.usersRepository.save(created);
  }

}