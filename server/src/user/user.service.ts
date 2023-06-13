import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/User';
import { LoginDto } from '../auth/dto/loginDto';
import { HashService } from '../services/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService
  ) {}

  async findOneByEmail( email: string ): Promise<User | null>{
    return this.usersRepository.findOne({ where: { email } })
  }

  async create( userDto: LoginDto ): Promise<User>{
    const { email, password } = userDto;
    const hashedPassword = await this.hashService.hash(password)
    const created = await this.usersRepository.create({ email, hashedPassword });
    return this.usersRepository.save(created);
  }

}