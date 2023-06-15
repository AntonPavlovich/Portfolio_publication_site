import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePortfolioDto {

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  name: string

  @IsString()
  @Length(10, 500)
  description

}

