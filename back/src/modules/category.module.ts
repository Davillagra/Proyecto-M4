import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesController } from '../controllers/category.controller'
import { Category } from '../entities/categories.entity'
import { CategoriesService } from '../services/categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoryModule {}
