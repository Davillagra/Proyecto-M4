import { Role } from '../interfaces/roles.enum'

export const users = [
  //Omit<UserDto, 'repeatPassword'>[]
  {
    email: 'admin@admin.com',
    name: 'Admin',
    password: 'admin123',
    address: 'AdminAdrress',
    phone: 987651,
    country: 'Admin',
    city: 'AdminTown',
    role: Role.ADMIN,
  },
  {
    email: 'superadmin@superadmin.com',
    name: 'superadmin',
    password: 'admin123',
    address: 'AdminAdrress',
    phone: 98765145,
    country: 'Admin',
    city: 'AdminTown',
    role: Role.SUPERADMIN,
  },
  {
    email: 'user1@example.com',
    name: 'Alice',
    password: 'password1',
    address: '123 Main St',
    phone: 5551234,
    country: 'USA',
    city: 'New York',
  },
  {
    email: 'user2@example.com',
    name: 'Bob',
    password: 'password2',
    address: '456 Elm St',
    phone: 5555678,
    country: 'Canada',
    city: 'Toronto',
  },
  {
    email: 'user3@example.com',
    name: 'Charlie',
    password: 'password3',
    address: '789 Oak St',
    phone: 5559101,
    country: 'UK',
    city: 'London',
  },
  {
    email: 'user4@example.com',
    name: 'David',
    password: 'password4',
    address: '321 Maple St',
    phone: 5551123,
    country: 'Australia',
    city: 'Sydney',
  },
  {
    email: 'user5@example.com',
    name: 'Eve',
    password: 'password5',
    address: '654 Pine St',
    phone: 5553345,
    country: 'Germany',
    city: 'Berlin',
  },
  {
    email: 'user6@example.com',
    name: 'Frank',
    password: 'password6',
    address: '987 Cedar St',
    phone: 5555567,
    country: 'France',
    city: 'Paris',
  },
  {
    email: 'user7@example.com',
    name: 'Grace',
    password: 'password7',
    address: '741 Birch St',
    phone: 5557788,
    country: 'Italy',
    city: 'Rome',
  },
  {
    email: 'user8@example.com',
    name: 'Henry',
    password: 'password8',
    address: '369 Walnut St',
    phone: 5559900,
    country: 'Spain',
    city: 'Madrid',
  },
  {
    email: 'user9@example.com',
    name: 'Isabella',
    password: 'password9',
    address: '852 Ash St',
    phone: 5551122,
    country: 'Brazil',
    city: 'Rio de Janeiro',
  },
  {
    email: 'user10@example.com',
    name: 'Jack',
    password: 'password10',
    address: '159 Oak St',
    phone: 5553344,
    country: 'Japan',
    city: 'Tokyo',
  },
  {
    email: 'user11@example.com',
    name: 'Kate',
    password: 'password11',
    address: '753 Pine St',
    phone: 5555566,
    country: 'China',
    city: 'Beijing',
  },
]
