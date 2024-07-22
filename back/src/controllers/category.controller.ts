import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { CategoryDto } from '../dto/Category.dto'
import { CategoriesService } from '../services/categories.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async getCategories(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Res() res: Response,
  ) {
    const categories = await this.categoryService.getCategories(
      Number(page),
      Number(limit),
    )
    res.status(200).json(categories)
  }

  @Get(':id')
  async getCategoryByID(@Param('id') id: string, @Res() res: Response) {
    const category = await this.categoryService.getCategoryByID(id)
    res.status(200).json(category)
  }

  @Post()
  async postProduct(@Body() data: CategoryDto, @Res() res: Response) {
    const category = await this.categoryService.postCategory(data)
    res.status(201).json(category)
  }

  // @Delete(':id')
  // async deleteProduct(@Param('id') id: string, @Res() res: Response) {
  //   const result = await this.categoryService.deleteCategory(id)
  //   res.status(200).json(result)
  // } // al elminar una categoria asignada a un producto te va a dar error, no lo hagas
}
