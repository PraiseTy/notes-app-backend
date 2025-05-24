import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { HTTP_STATUS } from 'src/responses/constants';
import { Response } from 'express';
import { User } from 'src/types/User';
import { LoginUserDto, CreateNewUserDto } from 'src/dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Res() res: Response, @Body() createUserDto: CreateNewUserDto) {
    const user: User = await this.userService.createUser(createUserDto);
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'User created successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    const result = await this.userService.login(loginUserDto);
    const user = result.user;
    const token = result.userToken;
    return res.status(HTTP_STATUS.OK).json({
      message: 'User logged in successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }
    });
  }
}
