import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './service/notes.service';
import { NotesModule } from './modules/notes.module';

const dotenv = require('dotenv');
dotenv.config();

const connectionUrl = process.env.CONNECTION_URL;

if (!connectionUrl) {
  throw new Error('CONNECTION_URL is not defined in environment variables');
}

@Module({
  imports: [MongooseModule.forRoot(connectionUrl), UserModule, NotesModule],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService]
})
export class AppModule {}
