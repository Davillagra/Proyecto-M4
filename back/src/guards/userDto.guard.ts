import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class UserDtoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const { email, name, password, address, phone, country, city } = req.body
    if (!email || !name || !password || !address || !phone || !country || !city)
      return false
    else return true
  }
}
