// import { Test, TestingModule } from '@nestjs/testing'
// import { UserController } from '../../src/controllers/users.controller'
// import { UserService } from '../../src/services/users.service'
// import { AuthService } from '../../src/services/auth.service'
// import { AuthGuard } from '../../src/guards/auth.guard'
// import { JwtService } from '@nestjs/jwt'
// import { User } from '../../src/entities/users.entity'
// import { Role } from '../../src/interfaces/roles.enum'
// import { Response } from 'express'

// describe('UsersController', () => {
//   let userController: UserController
//   let mockUserService: Partial<UserService>
//   let mockAuthService: Partial<AuthService>
//   let mockAuthGuard: Partial<AuthGuard>
//   let mockJwtService: Partial<JwtService>

//   let mockUser: User = {
//     id: 'c04e8460-284b-4f2f-9ef7-dd8dbbedfa28',
//     name: 'Sebastian',
//     email: 's@b.com',
//     password: 'Password6-',
//     address: '6 Main St',
//     phone: 381601346,
//     country: 'USA us',
//     city: 'Toronto',
//     role: Role.USER,
//     orders: [],
//   }
//   beforeEach(async () => {
//     userController.getUsers = jest.fn().mockResolvedValue([mockUser])
//     userController.getUserByID = jest.fn().mockResolvedValue(mockUser)
//     userController.postUser = jest.fn().mockResolvedValue(mockUser)
//     userController.putUser = jest.fn().mockResolvedValue(mockUser)
//     userController.deleteUser = jest.fn().mockResolvedValue(mockUser)

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         { provide: UserService, useValue: mockUserService },
//         { provide: AuthService, useValue: mockAuthService },
//         { provide: AuthGuard, useValue: mockAuthGuard },
//         { provide: JwtService, useValue: mockJwtService },
//       ],
//     }).compile()
//     userController = module.get<UserController>(UserController)
//   })

//   it('should be defined', () => {
//     expect(userController).toBeDefined()
//   })

//   it('getUsers() should return an array of users', async () => {
//     let res: Response
//     const result = await userController.getUsers(1, 5, res)
//     expect(result).toBeInstanceOf(Array)
//   })
// })
