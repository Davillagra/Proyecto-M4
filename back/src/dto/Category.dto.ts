import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryDto {
  /**Must be a valid name, between 3 and 50 characters
   * @example electronics
   */
  @IsNotEmpty()
  @IsString()
  name: string
}
