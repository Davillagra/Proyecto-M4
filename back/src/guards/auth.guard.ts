import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { options } from '../config/options'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) throw new UnauthorizedException('Bearer token not found')
    try {
      const secret = options.jwtSecret
      const payload = this.jwtService.verify(token, { secret })
      payload.iat = new Date(payload.iat * 1000)
      payload.exp = new Date(payload.exp * 1000)
      req.user = payload
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
