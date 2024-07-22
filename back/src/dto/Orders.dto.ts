import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ProductArray } from './ProductArray.dto'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

export class OrdersDto {
  /**Must be a valid UUID
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userID: string

  /**Must be a valid product array
   */
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Array of products',
    example: [
      { id: '', quantity: 3 },
      { id: '', quantity: 1 },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => ProductArray)
  products: ProductArray[]
}
