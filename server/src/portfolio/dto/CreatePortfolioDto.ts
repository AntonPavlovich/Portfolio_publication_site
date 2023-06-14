import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description

}

