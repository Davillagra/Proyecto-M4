import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { AuthGuard } from '../guards/auth.guard'
import { CloudinaryService } from '../services/cloudinary.service'
import { ProductsService } from '../services/products.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Products } from 'src/entities/products.entity'

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File too large, max 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|gif|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    await this.productsService.getProductByID(id)
    const image = await this.filesService.uploadImage(file)
    const updatedProduct: Products = await this.productsService.putProduct(id, {
      imgUrl: image.url,
    })
    res.status(200).json(updatedProduct)
  }
}
