import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryDto } from '../dto/Category.dto'
import { Category } from '../entities/categories.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(page: number, limit: number) {
    try {
      const [categories, total] = await this.categoriesRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      })
      return categories
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async getCategoryByID(id: string) {
    try {
      const category: Category = await this.categoriesRepository.findOneBy({
        id,
      })
      if (!category)
        throw new NotFoundException('Category not found for id: ' + id)
      return category
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async postCategory(data: CategoryDto) {
    try {
      const newCategory = this.categoriesRepository.create(data)
      const category = await this.categoriesRepository.save(newCategory)
      return category
    } catch (error) {
      if (error.driverError)
        throw new BadRequestException(error.driverError?.detail)
      else throw new InternalServerErrorException(error)
    }
  }

  async deleteCategory(id: string) {
    try {
      const result = await this.categoriesRepository.delete(id)
      if (result.affected === 0)
        throw new NotFoundException('Category not found for id: ' + id)
      return result
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
