import { v2 } from 'cloudinary'
import { options } from './options'

export const cloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: options.cloudinary.name,
      api_key: options.cloudinary.key,
      api_secret: options.cloudinary.secret,
    })
  },
}
