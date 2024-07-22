import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { cloudinaryConfig } from '../config/cloudinary'
import { FilesController } from '../controllers/files.controller'
import { Category } from '../entities/categories.entity'
import { Products } from '../entities/products.entity'
import { CloudinaryService } from '../services/cloudinary.service'
import { ProductsService } from '../services/products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category])],
  controllers: [FilesController],
  providers: [CloudinaryService, cloudinaryConfig, ProductsService],
})
export class FilesModule {}
