import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
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
    return this.client.send<string, LoginUserDto>(
      '/db/user/login',
      loginUserDto,
    );
  }
}
