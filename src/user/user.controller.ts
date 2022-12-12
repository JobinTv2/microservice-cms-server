import { Post, Body, Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth-guard';
import { LocalAuthGuard } from 'src/auth/auth-guard/local-auth-guard';
import { RolesGaurd } from 'src/auth/auth-guard/roles-gaurd';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from './dto/user-role.dot';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGaurd)
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
