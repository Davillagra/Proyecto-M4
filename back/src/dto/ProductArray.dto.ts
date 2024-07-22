import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator'

export class ProductArray {
  /**Must be a valid UUID
   * @example 123e4567-e89b-12d3-a456-426614174002
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string

  /**Must be a positive number
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number
}
