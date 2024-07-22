import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { UserService } from './users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Role } from '../interfaces/roles.enum'
import { UserDto } from '../dto/User.dto'
import { User } from '../entities/users.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async singup(data: Omit<UserDto, 'repeatPassword'>): Promise<User> {
    try {
      const userExists = await this.userService.getUserByEmail(data.email)
      if (userExists) throw new BadRequestException('Email already exists')
      const hasshedPassword = await bcrypt.hash(data.password, 10)
      if (!hasshedPassword)
        throw new BadRequestException('Error hashing password')
      data.password = hasshedPassword
      const user = await this.userService.postUser(data)
      return user
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      if (error.driverError)
        throw new BadRequestException(error.driverError?.detail)
      else throw new InternalServerErrorException(error)
    }
  }

  async signin(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email)
      if (!user) throw new BadRequestException('Wrong credentials')
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw new BadRequestException('Wrong credentials')
      // if (user.email === 'mail@mail.com') user.role = Role.ADMIN
      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        role: user.role,
      }
      const token = await this.jwtService.signAsync(userPayload)
      return { status: 200, message: 'Logged in succesfully', token }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error)
    }
  }
}
