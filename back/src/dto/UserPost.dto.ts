import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UserPostDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsStrongPassword()
  password: string

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // @MaxLength(80)
  // address: string

  // @IsNotEmpty()
  // @IsNumber()
  // phone: number

  // @IsString()
  // @MinLength(5)
  // @MaxLength(20)
  // country: string

  // @IsString()
  // @MinLength(5)
  // @MaxLength(20)
  // city: string
}
