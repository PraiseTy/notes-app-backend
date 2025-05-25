import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.models';
import { UserController } from '../controllers/user.controller';
import { UserService } from 'src/service/user.service';
import { LoggerModule } from './logger.module';
@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
