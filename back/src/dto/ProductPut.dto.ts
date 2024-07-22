import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class ProductPutDto {
  /**Must be a valid name, between 3 and 50 characters
   * @example "Product 1"
   */
  @IsOptional()
  @IsString()
  name: string

  /**Must be a valid description, between 3 and 50 characters
   * @example "I am a description"
   */
  @IsOptional()
  @IsString()
  description: string

  /**Must be a positive number
   * @example 50
   */
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number

  /**Must be a positive number
   * @example 5
   */
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock: number

  /**Must be a valid url
   * @example https://i.pinimg.com/736x/84/c5/ff/84c5ff4002c4c4bd4f780320cec7db8c.jpg
   */
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsOptional()
  imgUrl: string

  /**Must be a valid category
   * @example smartphone
   */
  @IsOptional()
  @IsString()
  @MaxLength(20)
  category: string
}
