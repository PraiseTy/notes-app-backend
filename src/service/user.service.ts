import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewUserDto } from '../dtos/createNewUser.dto';
import { User } from '../models/user.models';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async createUser(createNewUserDto: CreateNewUserDto): Promise<User> {
    const createdUser = new this.userModel(createNewUserDto);
    return createdUser.save();
  }
}
