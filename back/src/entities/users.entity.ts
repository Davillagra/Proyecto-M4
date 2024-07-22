import { Role } from '../interfaces/roles.enum'
import { Orders } from '../entities/orders.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ApiResponse } from '@nestjs/swagger'

@Entity({ name: 'users' })
export class User {
  /** The id of the user. Format: uuid.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** The email of the user.
   * @example 'mail@mail.com'
   */
  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string

  /** The name of the user.
   * @example 'John'
   */
  @Column({ type: 'varchar', length: 50 })
  name: string

  /** The hashed password of the user. Must
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @Column({ type: 'varchar', length: 100 })
  password: string

  /** The address of the user.
   * @example '123 Main St'
   */
  @Column({ type: 'varchar', length: 80 })
  address: string

  /** The phone number of the user.
   * @example '123456789'
   */
  @Column({ type: 'bigint', unique: true })
  phone: number

  /** The country of the user.
   * @example 'USA'
   */
  @Column({ nullable: true, type: 'varchar', length: 20 })
  country?: string

  /** The city of the user.
   * @example 'New York'
   */
  @Column({ nullable: true, type: 'varchar', length: 20 })
  city?: string

  /** The orders of the user.
   *
   */
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[]

  /** The role of the user.
   * @example "User"
   */
  @Column({ default: Role.USER })
  role: Role
}
