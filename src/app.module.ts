import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';

const dotenv = require('dotenv');
dotenv.config();

const connectionUrl = process.env.CONNECTION_URL;

if (!connectionUrl) {
  throw new Error('CONNECTION_URL is not defined in environment variables');
}

@Module({
  imports: [MongooseModule.forRoot(connectionUrl), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
