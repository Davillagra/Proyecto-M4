import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthGuard } from '../guards/auth.guard'
import { UserDto } from '../dto/User.dto'
import { UserService } from '../services/users.service'
import { User } from '../entities/users.entity'
import { SigninDto } from '../dto/Singin.dto'
import { Roles } from '../decorator/roles.decorator'
import { Role } from '../interfaces/roles.enum'
import { RoleGuard } from '../guards/role.guard'
import { AuthService } from '../services/auth.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserPutDto } from 'src/dto/UserPut.dto'
import { RoleSuperAdminGuard } from 'src/guards/roleSuperAdmin.guard'

@ApiTags('Users')
@ApiResponse({ type: [User] })
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @Get('testauth')
  // getAuth0Protected(@Req() req: Request) {
  //   console.log(req.oidc.accessToken)
  //   return JSON.stringify(req.oidc.user)
  // }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Res() res: Response,
  ) {
    const users = await this.userService.getUsers(Number(page), Number(limit))
    res.status(200).json(users)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getUserByID(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserByID(id)
    res.status(200).json(user)
  }

  @Post('signup')
  async postUser(@Body() data: UserDto, @Res() res: Response) {
    if (data.password !== data.repeatPassword)
      throw new BadRequestException('Passwords do not match')
    const user = await this.authService.singup(data)
    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
    })
  }

  @Post('signin')
  async signin(
    @Body()
    data: SigninDto,
    @Res() res: Response,
    @Req() req: Request & { now: string; user: any },
  ) {
    const user = await this.authService.signin(data.email, data.password)
    res.status(200).json(user)
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async putUser(
    @Body() data: UserPutDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const updatedUser: Omit<User, 'role' | 'password' | 'orders'> =
      await this.userService.putUser(id, data)
    res
      .status(200)
      .json({ status: 200, message: 'User updated succesfully', updatedUser })
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const result = await this.userService.deleteUser(id)
    res.status(200).json({
      status: 200,
      message: 'User deleted succesfully',
      affected: result.affected,
    })
  }

  @Put('setAdmin/:id')
  @Roles(Role.SUPERADMIN)
  @UseGuards(AuthGuard, RoleSuperAdminGuard)
  @ApiBearerAuth()
  async createAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const result = await this.userService.createAdmin(id)
    res.status(200).json(result)
  }
}
