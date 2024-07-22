import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { OrdersDto } from '../dto/Orders.dto'
import { AuthGuard } from '../guards/auth.guard'
import { OrdersService } from '../services/orders.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/decorator/roles.decorator'
import { Role } from 'src/interfaces/roles.enum'
import { RoleGuard } from 'src/guards/role.guard'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Res() res: Response,
  ) {
    const orders = await this.ordersService.getOrders(
      Number(page),
      Number(limit),
    )
    res.status(200).json(orders)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getOrderByID(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.getOrderByID(id)
    res.status(200).json(order)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async postOrders(@Body() data: OrdersDto, @Res() res: Response) {
    const order = await this.ordersService.postOrder(data)
    res.status(200).json(order)
  }

  // @Get('details/:id')
  // async getOrderDetails(@Param('id') id: string, @Res() res: Response) {
  //   const order = await this.ordersService.getOrderDetialsByID(id)
  //   res.status(200).json(order)
  // }
}
