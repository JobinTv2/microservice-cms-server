import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.client
      .send<string, CreateUserDto>('db/user', createUserDto)
      .pipe();
  }

  login(loginUserDto: LoginUserDto) {
    console.log('hii');
    return this.client.send<string, LoginUserDto>(
      '/db/user/login',
      loginUserDto,
    );
  }

  async findOne(id: string) {
    const user = await firstValueFrom(
      this.client.send<string, string>('db/user/get', id),
    );
    if (Object.prototype.hasOwnProperty.call(user, 'error')) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
