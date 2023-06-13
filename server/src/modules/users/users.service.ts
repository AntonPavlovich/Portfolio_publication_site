import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/User';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: Repository<UserEntity>
  ) {}

  async findOneByEmail( email: string ): Promise<UserEntity>{
    return this.usersRepository.findOne({ where: { email } })
  }

  async create( userDto: CreateUserDto ): Promise<UserEntity>{
    const created = await this.usersRepository.create(userDto);
    return this.usersRepository.save(created);
  }

}