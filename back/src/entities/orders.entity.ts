import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './users.entity'
import { OrderDetails } from './orderDetails.entity'

@Entity({ name: 'orders' })
export class Orders {
  /** The id of the order. Format: uuid.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** The date of the order.
   * @example '2022-01-01'
   */
  @Column({ type: 'date' })
  date: Date

  /* The details of the order.
   */
  @OneToOne(() => OrderDetails)
  @JoinColumn()
  orderDetails: OrderDetails

  /* The user owner of the order.
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User
}
