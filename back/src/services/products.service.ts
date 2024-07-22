import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common'
import { ProductDto } from '../dto/Product.dto'
import { Products } from '../entities/products.entity'
import { Category } from '../entities/categories.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { categories as seedCategories } from '../temp/categories'
import { products } from '../temp/products'

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const categoriesCount = await this.categoriesRepository.count()
      const productsCount = await this.productsRepository.count()
      if (categoriesCount === 0 && productsCount === 0) {
        for (const category of seedCategories) {
          const newCategory = await this.categoriesRepository.create(category)
          await this.categoriesRepository.save(newCategory)
        }
        const categories = await this.categoriesRepository.find()
        for (const product of products) {
          for (const category of categories) {
            if (category.name === product.category) {
              const newProduct = this.productsRepository.create({
                ...product,
                category,
              })
              await this.productsRepository.save(newProduct)
            }
          }
        }
        return
      } else return
    } catch (error) {
      throw new InternalServerErrorException(
        'Error communicating with the database',
      )
    }
  }

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const [products, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { category: true },
    })
    return products
  }

  async getProductByID(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: { category: true },
      })
      if (product) return product
      else throw new NotFoundException(`Product not found for id: ${id}`)
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      else
        throw new InternalServerErrorException(
          'Error communicating with the database',
        )
    }
  }

  async postProduct(data: ProductDto) {
    try {
      const category = await this.categoriesRepository.findOneBy({
        name: data.category,
      })
      if (category) {
        const newProduct = this.productsRepository.create({ ...data, category })
        const product = await this.productsRepository.save(newProduct)
        return product
      } else
        throw new NotFoundException('Category not found : ' + data.category)
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      else if (error.driverError)
        throw new BadRequestException(error.driverError?.detail)
      else
        throw new InternalServerErrorException(
          'Error communicating with the database',
        )
    }
  }

  async putProduct(id: string, data: Partial<ProductDto>): Promise<Products> {
    try {
      const existingProduct = await this.productsRepository.findOne({
        where: { id },
      })
      if (!existingProduct) {
        throw new NotFoundException('Product not found for id: ' + id)
      }
      if (data.category) {
        const category = await this.categoriesRepository.findOneBy({
          name: data.category,
        })
        if (!category) {
          throw new NotFoundException('Category not found : ' + data.category)
        }
        const parsedData = { ...data, category }
        await this.productsRepository.update(id, parsedData)
        const updatedProduct = await this.productsRepository.findOne({
          where: { id },
        })
        return updatedProduct
      }
      await this.productsRepository.update(id, {
        ...data,
        category: existingProduct.category,
      })
      const updatedProduct = await this.productsRepository.findOne({
        where: { id },
      })
      return updatedProduct
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else if (error.driverError) {
        throw new BadRequestException(error.driverError.detail)
      } else {
        throw new InternalServerErrorException(
          'Error communicating with the database',
        )
      }
    }
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    try {
      const result = await this.productsRepository.delete(id)
      if (result.affected === 0)
        throw new NotFoundException('Product not found for id: ' + id)
      return result
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      else throw new InternalServerErrorException(error)
    }
  }
}
