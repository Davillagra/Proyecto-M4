import { DataSource, DataSourceOptions } from 'typeorm'
import { options } from './options'
import { registerAs } from '@nestjs/config'

const config = {
  type: 'postgres',
  database: options.bdInfo.name,
  host: options.bdInfo.host,
  port: options.bdInfo.port,
  username: options.bdInfo.username,
  password: options.bdInfo.pass,
  // dropSchema: true,
  // logging: true,/
  synchronize: true,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
}
export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)
