import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from 'src/types/User';
import { LoginUserDto, CreateNewUserDto } from 'src/dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateNewUserDto) {
    const user: User = await this.userService.createUser(createUserDto);
    return {
      message: 'User created successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.userService.login(loginUserDto);
    const user = result.user;
    const token = result.userToken;
    return {
      message: 'User logged in successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }
    };
  }
}
