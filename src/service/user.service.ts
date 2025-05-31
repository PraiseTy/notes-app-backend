import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.models';
import { LoginUserDto, CreateNewUserDto } from '../dtos';
import { BaseService } from './logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: LoggerService
  ) {
    super(logger);
  }
  async createUser(createNewUserDto: CreateNewUserDto): Promise<User> {
    const { email } = createNewUserDto;
    const user = await this.userModel.find({ email: email });

    if (user) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = new this.userModel(createNewUserDto);
    this.logger.log('User created', 'UserSignUp');
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
      throw new UnauthorizedException('User does not match');
    }
    const token = user.createJWT();
    this.logger.log('User login Successful', 'loginUser');
    return { user, userToken: token };
  }
}
