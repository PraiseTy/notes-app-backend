import { Module } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from '../models/notes.models';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../service/notes.service';

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: 'Note', schema: NotesSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
