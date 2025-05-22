import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateNewUserDto } from '../dtos/createNewUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateNewUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
