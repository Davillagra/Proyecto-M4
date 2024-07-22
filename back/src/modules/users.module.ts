import { Module } from '@nestjs/common'
import { UserService } from '../services/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities/users.entity'
import { UserController } from '../controllers/users.controller'
import { AuthService } from '../services/auth.service'
import { Orders } from '../entities/orders.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Orders])],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
