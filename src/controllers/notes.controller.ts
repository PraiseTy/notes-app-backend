import { Body, Controller, Post } from '@nestjs/common';
import { NotesService } from '../service/notes.service';
import { AddNotesDto } from '../dtos/addNote.dto';
import { Note } from '../models/notes.models';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post('create')
  async createNote(@Body() addNoteDto: AddNotesDto) {
    const note: Note = await this.notesService.createNote(addNoteDto);
    return {
      message: 'Note created successfully',
      data: note
    };
  }
}
