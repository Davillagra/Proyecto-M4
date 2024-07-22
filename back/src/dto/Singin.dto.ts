import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class SigninDto {
  /**Must be a valid email
   * @example mail@mail.com
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  /**Must be a valid password
   * @example !Password123
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  password: string
}
