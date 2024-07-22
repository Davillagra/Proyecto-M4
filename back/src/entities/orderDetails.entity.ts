import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Products } from '../entities/products.entity'
import { ProductArray } from 'src/dto/ProductArray.dto'

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  /** The id of the order details. Format: uuid.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** The total price of the order.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  /** The array of products conforming the order.
   * @example
   */
  // @ManyToMany(() => Products, (product) => product.orderDetails)
  // @JoinTable()
  // products: Products[]

  @Column({ type: 'jsonb' })
  products: ProductArray[]
}
