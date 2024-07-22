import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersController } from '../controllers/orders.controller'
import { OrderDetails } from '../entities/orderDetails.entity'
import { Orders } from '../entities/orders.entity'
import { Products } from '../entities/products.entity'
import { User } from '../entities/users.entity'
import { OrdersService } from '../services/orders.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Products, OrderDetails, User, Products]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
