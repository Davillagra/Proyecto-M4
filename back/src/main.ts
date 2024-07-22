import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json } from 'express'
import { options } from './config/options'
import * as cors from 'cors'
import { ValidationPipe } from '@nestjs/common'
import { auth } from 'express-openid-connect'
import { auth0Config } from './config/auth0'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  app.use(json())
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PM4-Davillagra')
    .setDescription('The PM4-Davillagra API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(options.port)
}

bootstrap()
