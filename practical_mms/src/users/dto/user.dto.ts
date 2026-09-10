import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  age!: number;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
