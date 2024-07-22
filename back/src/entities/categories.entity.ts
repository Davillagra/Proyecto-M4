import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Products } from './products.entity'

@Entity({ name: 'category' })
export class Category {
  /** The id of the category. Format: uuid.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** The name of the category.
   * @example 'Electronics'
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string

  /** The products corresponding to the category.
   */
  @OneToMany(() => Products, (product) => product.category)
  products: Products[]
}
