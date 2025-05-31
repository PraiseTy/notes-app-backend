import { Controller, Post } from '@nestjs/common';
import { NotesService } from '../service/notes.service';
import { AddNotesDto } from '../dtos/addNote.dto';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post('create')
  async createNote(addNoteDto: AddNotesDto) {
    await this.notesService.createNote(addNoteDto);
  }
}
