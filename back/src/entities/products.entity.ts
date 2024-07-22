import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { Category } from './categories.entity'
import { OrderDetails } from './orderDetails.entity'

@Entity({ name: 'products' })
export class Products {
  /** The id of the product. Format: uuid.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** The name of the product.
   * @example 'Product 1'
   */
  @Column({ type: 'varchar', length: 50 })
  name: string

  /** The description of the product.
   * @example 'Product 1 description'
   */
  @Column({ type: 'varchar', length: 100 })
  description: string

  /** The name of the product.
   * @example 'Product 1'
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  /** The stock of the product.
   * @example 10
   */
  @Column({ type: 'int' })
  stock: number

  /** The URL of the image of the product.
   * @example 'Product 1'
   */
  @Column({
    default: 'https://shop.bbc.com/cdn/shop/products/14847.jpg?v=1567526955',
    type: 'varchar',
    length: 200,
  })
  imgUrl: string

  /** The category of the product.
   */
  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  /** The order details.
   */
  // @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  // @JoinTable()
  // orderDetails: OrderDetails[]
}
