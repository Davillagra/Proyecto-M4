import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UserPutDto {
  /**Must be a valid email
   * @example mail@mail.com
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  /**Must be a valid name, between 3 and 50 characters
   * @example Sebastian
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  /**Must be a valid strong password between 8 and 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character
   * @example !Password123
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsStrongPassword()
  password: string

  /**Address must be between 5 and 80 characters
   * @example 123 Main St
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string

  /**Must be a valid phone number
   * @example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number

  /**Country must be between 5 and 20 characters
   * @example Argentina
   */
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string

  /**City must be between 5 and 20 characters
   * @example Buenos Aires
   */
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string
}
