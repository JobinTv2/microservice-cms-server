import { Post, Body, Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth-guard';
import { LocalAuthGuard } from 'src/auth/auth-guard/local-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  getUser() {
    return 'Auth';
  }
}
