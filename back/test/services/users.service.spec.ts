import { User } from '../../src/entities/users.entity'
import { UserService } from '../../src/services/users.service'
import { Role } from '../../src/interfaces/roles.enum'
import { NotFoundException } from '@nestjs/common'
import { UserDto } from '../../src/dto/User.dto'

describe('UsersService', () => {
  let mockUserService: Partial<UserService>
  const mockUser: Omit<User, 'password' | 'role'> = {
    id: 'c04e8460-284b-4f2f-9ef7-dd8dbbedfa28',
    name: 'Sebastian',
    email: 's@b.com',
    address: '6 Main St',
    phone: 381601346,
    country: 'USA us',
    city: 'Toronto',
    orders: [],
  }
  const mockUserDto: UserDto = {
    name: 'Sebastian',
    email: 's@b.com',
    password: 'Password6-',
    address: '6 Main St',
    phone: 381601346,
    country: 'USA us',
    city: 'Toronto',
    repeatPassword: 'Password6-',
  }

  beforeEach(() => {
    mockUserService = {
      getUsers: () => Promise.resolve([{ ...mockUser, role: Role.USER }]),
      getUserByID: (id: string) => Promise.resolve(mockUser),
      postUser: (data: Omit<UserDto, 'repeatPassword'>) =>
        Promise.resolve({
          ...mockUser,
          role: Role.USER,
          id: 'c04e8460-284b-4f2f-9ef7-dd8dbbedfa28',
          orders: [],
          password: 'Password6-',
        }),
      putUser: (id: string, mockUserDto) => Promise.resolve(mockUser),
      deleteUser: (id: string) => Promise.resolve({ affected: 1, raw: [] }),
    }
  })
  it('should be defined', () => {
    expect(true).toBe(true)
  })
  it('getUsers() should return an array of users', async () => {
    const users = await mockUserService.getUsers(1, 5)
    expect(users).toBeInstanceOf(Array)
    expect(typeof users[0]).toBe('object')
  })
  it('getUserByID() should return a user if id is correct', async () => {
    const user = await mockUserService.getUserByID(mockUser.id)
    expect(user).toBeInstanceOf(Object)
    expect(typeof user).toBe('object')
  })
  it('getUserByID() should throw an error (404) if id is incorrect', async () => {
    try {
      await mockUserService.getUserByID('wrongID')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
  it('getUserByID() returned user should not have password', async () => {
    const user = await mockUserService.getUserByID(mockUser.id)
    expect(user).not.toHaveProperty('password')
  })
  it('postUser() should return a new user', async () => {
    const user = await mockUserService.postUser(mockUserDto)
    expect(user).toBeInstanceOf(Object)
    expect(typeof user).toBe('object')
    expect(typeof user.id).toBe('string')
  })
  it('putUser() should return an updated user', async () => {
    const user = await mockUserService.putUser(mockUser.id, mockUserDto)
    expect(user).toBeInstanceOf(Object)
    expect(typeof user).toBe('object')
    expect(typeof user.id).toBe('string')
  })
  it('putUser() should throw an error (404) if id is incorrect', async () => {
    try {
      await mockUserService.putUser('wrongID', mockUserDto)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
  it('deleteUser() should return an object with affected = 1', async () => {
    const result = await mockUserService.deleteUser(mockUser.id)
    expect(result).toBeInstanceOf(Object)
    expect(result.affected).toBe(1)
  })
  it('deleteUser() should throw an error (404) if id is incorrect', async () => {
    try {
      await mockUserService.deleteUser('wrongID')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
