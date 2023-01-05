import { Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new HttpExceptionFilter('Provide valid credentials', HttpStatus.OK);
      // throw new UnauthorizedException();
    }
    return user;
  }
}
