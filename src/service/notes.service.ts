import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BaseService } from './logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../models/notes.models';
import { AddNotesDto } from '../dtos/addNote.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class NotesService extends BaseService {
  constructor(
    @InjectModel('Note') private NoteModel: Model<Note>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) logger: LoggerService
  ) {
    super(logger);
  }

  async createNote(addNoteDto: AddNotesDto): Promise<Note> {
    const note = new this.NoteModel(addNoteDto);
    this.logger.log('Note created successfully.', 'createNote');
    return note.save();
  }
}
