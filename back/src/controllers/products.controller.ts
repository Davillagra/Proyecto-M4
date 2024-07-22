import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '../guards/auth.guard'
import { ProductDto } from '../dto/Product.dto'
import { ProductsService } from '../services/products.service'
import { RoleGuard } from '../guards/role.guard'
import { Roles } from '../decorator/roles.decorator'
import { Role } from '../interfaces/roles.enum'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ProductPutDto } from 'src/dto/ProductPut.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Res() res: Response,
  ) {
    const products = await this.productsService.getProducts(
      Number(page),
      Number(limit),
    )
    res.status(200).json(products)
  }

  @Get(':id')
  async getProductByID(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.getProductByID(id)
    res.status(200).json(product)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async postProduct(@Body() data: ProductDto, @Res() res: Response) {
    const product = await this.productsService.postProduct(data)
    res.status(201).json(product)
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth()
  async putProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProductPutDto,
    @Res() res: Response,
  ) {
    const updatedProduct = await this.productsService.putProduct(id, data)
    res.status(201).json({
      status: 200,
      message: 'Product updated succesfully',
      updatedProduct,
    })
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const result = await this.productsService.deleteProduct(id)
    res.status(200).json({
      status: 200,
      message: 'Product deleted succesfully',
      affected: result.affected,
    })
  }
}
