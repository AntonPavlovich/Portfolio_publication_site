import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/User';
import { LoginDto } from '../auth/dto/loginDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findOneByEmail( email: string ): Promise<UserEntity>{
    return this.usersRepository.findOne({ where: { email } })
  }

  async create( userDto: LoginDto ): Promise<UserEntity>{
    const created = await this.usersRepository.create(userDto);
    return this.usersRepository.save(created);
  }

}