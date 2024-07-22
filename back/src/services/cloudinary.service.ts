import { Injectable } from '@nestjs/common'
import { UploadApiResponse, v2 } from 'cloudinary'
import * as toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resurce_type: 'auto' },
        (error, result) => {
          if (error) return reject(error)
          else resolve(result)
        },
      )
      toStream(file.buffer).pipe(upload)
    })
  }
}
