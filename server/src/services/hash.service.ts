import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const {
  SALT_ROUNDS
} = process.env;

@Injectable()
export class HashService {

  async hash ( password: string ): Promise<string> {
    return await bcrypt.hash(password, parseInt(SALT_ROUNDS, 10)|| 10)
  }

  async compare( password: string, dbPassword: string ): Promise<boolean> {
    return await bcrypt.compare(password, dbPassword)
  }

}