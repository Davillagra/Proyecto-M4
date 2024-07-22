import 'dotenv/config'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: ['./.env.development', './.env'] })

export const options = {
  port: process.env.PORT || 3000,
  bdInfo: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'test',
    pass: process.env.DB_PASS || 'test',
    name: process.env.DB_NAME || 'test',
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME || 'test',
    key: process.env.CLOUDINARY_API_KEY || 'test',
    secret: process.env.CLOUDINARY_API_SECRET || 'test',
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
  auth0: {
    baseURl: process.env.AUTH0_BASE_URL || 'test',
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || 'test',
    clientID: process.env.AUTH0_CLIENT_ID || 'test',
    secret: process.env.AUTH0_SECRET || 'test',
  },
}
