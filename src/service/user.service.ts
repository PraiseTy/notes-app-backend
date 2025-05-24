import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.models';
import { LoginUserDto, CreateNewUserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async createUser(createNewUserDto: CreateNewUserDto): Promise<User> {
    const createdUser = new this.userModel(createNewUserDto);
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: User; userToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatching = await user.comparePassword(password);
    if (!isPasswordMatching) {
      throw new NotFoundException('User does not match');
    }
    const token = user.createJWT();
    return { user, userToken: token };
  }
}
