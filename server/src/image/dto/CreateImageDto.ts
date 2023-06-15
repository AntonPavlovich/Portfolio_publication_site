import { IsString, Length } from 'class-validator';

export class CreateImageDto {

  @IsString()
  @Length(0, 500)
  description: string

}