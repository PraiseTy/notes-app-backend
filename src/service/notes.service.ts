import { Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
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

  async getAllNotes(userId: string): Promise<Note[]> {
    this.logger.log('Retrieved notes successfully', 'getAllNotes');
    return this.NoteModel.find({ writer: userId }).exec();
  }

  async getNoteById(noteId: string, userId: string): Promise<Note> {
    const note = await this.NoteModel.findOne({ _id: noteId, writer: userId });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    this.logger.log('Retrieved single note', 'getNoteById');
    return note;
  }

  async editNote(
    noteId: string,
    userId: string,
    updateData: Partial<Pick<Note, 'title' | 'body' | 'tags'>>
  ): Promise<Note> {
    const note = await this.NoteModel.findOneAndUpdate(
      { _id: noteId, writer: userId },
      { $set: updateData },
      { new: true }
    );
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    this.logger.log('Note updated successfully', 'editNote');
    return note;
  }

  async deleteNote(noteId: string, userId: string): Promise<void> {
    await this.NoteModel.findOneAndDelete({ _id: noteId, writer: userId });
    this.logger.log('Note deleted successfully', 'deleteNote');
  }
}
