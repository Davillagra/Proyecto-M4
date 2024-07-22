import { Test } from '@nestjs/testing'
import { AuthService } from '../../src/services/auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../../src/services/users.service'
import { UserDto } from 'src/dto/User.dto'
import { BadRequestException } from '@nestjs/common'
import { User } from 'src/entities/users.entity'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Role } from '../../src/interfaces/roles.enum'
describe('AuthService', () => {
  let authService: AuthService
  let mockUserService: Partial<UserService>
  const mockUser: Omit<UserDto, 'repeatPassword'> = {
    name: 'Sebastian',
    email: 's@b.com',
    password: 'Password6-',
    address: '6 Main St',
    phone: 381601346,
    country: 'USA us',
    city: 'Toronto',
  }
  beforeEach(async () => {
    mockUserService = {
      getUserByEmail: () => Promise.resolve(undefined),
      postUser: (data: Omit<UserDto, 'repeatPassword'>) =>
        Promise.resolve({
          ...data,
          role: Role.USER,
          id: 'c04e8460-284b-4f2f-9ef7-dd8dbbedfa28',
          orders: [],
        }),
    }
    const mockJwtService = {
      signAsync: (payload) => jwt.sign(payload, 'testSecret'),
    }
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile()
    authService = module.get<AuthService>(AuthService)
  })

  it('Create a instance of AuthService', async () => {
    expect(authService).toBeDefined()
  })
  it('signup() creates a new user whit a hashed password', async () => {
    const user = await authService.singup({ ...mockUser })
    expect(user).toBeDefined()
    expect(user.password).not.toBe(mockUser.password)
  })
  it('signup() throws an error if email already exists', async () => {
    mockUserService.getUserByEmail = () => Promise.resolve(mockUser as User)
    try {
      await authService.singup({ ...mockUser })
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('signin() throws an error if passwords do not match', async () => {
    mockUserService.getUserByEmail = () => Promise.resolve(mockUser as User)
    try {
      await authService.signin(mockUser.email, 'WrongPassword')
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })
  it('signin() throws an error if email does not exist', async () => {
    try {
      await authService.signin(mockUser.email, mockUser.password)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })
  it('signin() returns a token', async () => {
    const mockUserVariant = {
      ...mockUser,
      password: await bcrypt.hash(mockUser.password, 10),
    }
    mockUserService.getUserByEmail = () =>
      Promise.resolve(mockUserVariant as User)
    const res = await authService.signin(mockUser.email, mockUser.password)
    expect(res).toHaveProperty('token')
  })
})
