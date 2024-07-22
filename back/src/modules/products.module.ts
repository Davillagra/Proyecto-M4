import { Module } from '@nestjs/common'
import { ProductsService } from '../services/products.service'
import { Products } from '../entities/products.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from '../controllers/products.controller'
import { Category } from '../entities/categories.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
