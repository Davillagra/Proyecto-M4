import { registerAs } from '@nestjs/config'

const config = {
  type: 'sqlite',
  database: ':memory:',
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
}

export default registerAs('local', () => config)
