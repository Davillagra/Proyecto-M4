import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common'
import { UserDto } from '../dto/User.dto'
import { User } from '../entities/users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { users } from '../temp/users'
import * as bcrypt from 'bcrypt'
import { Orders } from '../entities/orders.entity'
import { UserPutDto } from 'src/dto/UserPut.dto'
import { Role } from 'src/interfaces/roles.enum'

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    try {
      const usersCount = await this.usersRepository.count()
      if (usersCount === 0) {
        for (const user of users) {
          user.password = await bcrypt.hash(user.password, 10)
          await this.postUser(user)
        }
        return
      } else {
        return
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password' | 'orders'>[]> {
    try {
      const [users, total] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        select: [
          'id',
          'email',
          'name',
          'address',
          'phone',
          'country',
          'city',
          'role',
        ],
      })
      return users
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async getUserByID(id: string): Promise<Omit<User, 'password' | 'role'>> {
    try {
      const user: User = await this.usersRepository.findOne({
        where: { id },
        relations: { orders: { orderDetails: true } },
        select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city'],
      })
      if (!user) throw new NotFoundException('User not found for id: ' + id)
      return user
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneBy({ email })
      return user
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async postUser(data: Omit<UserDto, 'repeatPassword'>): Promise<User> {
    try {
      const newUser: User = await this.usersRepository.create(data)
      const user: User = await this.usersRepository.save(newUser)
      return user
    } catch (error) {
      throw error
    }
  }

  async putUser(
    id: string,
    data: UserPutDto,
  ): Promise<Omit<User, 'password' | 'orders' | 'role'>> {
    try {
      const result: UpdateResult = await this.usersRepository.update(id, data)
      if (result.affected === 0)
        throw new NotFoundException('User not found for id: ' + id)
      const updatedUser = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city'],
      })
      return updatedUser
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      if (error) throw new Error(error)
      else throw new InternalServerErrorException('Internal server error')
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          orders: true,
        },
      })
      if (!user) throw new NotFoundException('User not found for id: ' + id)
      for (const order of user.orders) {
        order.user = null
        await this.ordersRepository.save(order)
      }
      const result: DeleteResult = await this.usersRepository.delete(user.id)
      return result
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async createAdmin(id: string) {
    try {
      const userExists = await this.usersRepository.findOneBy({ id })
      if (!userExists)
        throw new NotFoundException('User not found for id: ' + id)
      userExists.role = Role.ADMIN
      const updateUser = await this.usersRepository.save(userExists)
      return updateUser
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
