import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrdersDto } from '../dto/Orders.dto'
import { OrderDetails } from '../entities/orderDetails.entity'
import { Orders } from '../entities/orders.entity'
import { Products } from '../entities/products.entity'
import { User } from '../entities/users.entity'
import { Repository } from 'typeorm'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async getOrders(page: number, limit: number) {
    try {
      const [orders, total] = await this.ordersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { orderDetails: true },
      })
      return orders
    } catch (error) {
      throw new InternalServerErrorException('' + error)
    }
  }

  // async getOrderDetialsByID(id: string) {
  //   try {
  //     const order = await this.ordersDetailsRepository.findOne({
  //       where: { id },
  //       relations: { products: true },
  //     })
  //     if (!order) throw new NotFoundException(`Order not found for id: ${id}`)
  //     return order
  //   } catch (error) {
  //     if (error instanceof NotFoundException) throw error
  //     throw new InternalServerErrorException('' + error)
  //   }
  // }

  async getOrderByID(id: string) {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: {
          orderDetails: true,
          user: true,
        },
      })
      if (!order) throw new NotFoundException(`Order not found for id: ${id}`)
      if (order.user) delete order.user.password
      return order
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('' + error)
    }
  }

  async postOrder(data: OrdersDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: data.userID },
        relations: ['orders'],
      })
      if (!user)
        throw new NotFoundException(`User not found for id: ${data.userID}`)
      let totalPrice = 0
      const productsToUpdate = []
      const orderProducts = []
      for (const product of data.products) {
        const exists = await this.productsRepository.findOneBy({
          id: product.id,
        })
        if (!exists)
          throw new NotFoundException(`Product not found for id: ${product.id}`)
        if (exists.stock < product.quantity)
          throw new BadRequestException(
            `Not enough stock for product id: ${exists.id}`,
          )
        totalPrice += Number(exists.price) * product.quantity
        exists.stock -= product.quantity
        // productsToUpdate.push(exists)
        orderProducts.push({ ...exists, quantity: product.quantity })
      }
      for (const product of orderProducts) {
        await this.productsRepository.save(product)
      }
      const newOrderDetails = await this.ordersDetailsRepository.create()
      newOrderDetails.products = orderProducts
      newOrderDetails.price = totalPrice
      const orderDetails =
        await this.ordersDetailsRepository.save(newOrderDetails)
      const newOrder = await this.ordersRepository.create({ date: new Date() })
      newOrder.orderDetails = orderDetails
      const order = await this.ordersRepository.save(newOrder)
      user.orders.push(order)
      await this.userRepository.save(user)
      return { id: order.id, price: orderDetails.price }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      )
        throw error
      throw new InternalServerErrorException('' + error)
    }
  }
}
