import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { UserModule } from './modules/users.module'
import { ProductsModule } from './modules/products.module'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import typeorm from './config/typeorm'
import { CategoryModule } from './modules/category.module'
import { OrdersModule } from './modules/orders.module'
import { FilesModule } from './modules/files.module'
import { JwtModule } from '@nestjs/jwt'
import { options } from './config/options'
import { requiresAuth } from 'express-openid-connect'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: options.jwtSecret,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
    consumer.apply(requiresAuth()).forRoutes('/users/testauth')
  }
}
