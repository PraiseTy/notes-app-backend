import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req
} from '@nestjs/common';
import { NotesService } from '../service/notes.service';
import { AddNotesDto } from '../dtos/addNote.dto';
import { Note } from '../models/notes.models';
import { IExtendedRequest } from '../middleware/ExtendedRequest';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post('create')
  async createNote(@Req() req: IExtendedRequest, @Body() addNoteDto: AddNotesDto) {
    const { id } = req.user;
    const note: Note = await this.notesService.createNote({ ...addNoteDto, writer: id });
    return {
      message: 'Note created successfully',
      data: note
    };
  }

  @Get('/all')
  async getAllNotes(@Req() req: IExtendedRequest) {
    const { id } = req.user;
    return this.notesService.getAllNotes(id);
  }

  @Get('/:id')
  async getNote(@Req() req: IExtendedRequest, @Param('id') noteId: string) {
    const { id } = req.user;
    return this.notesService.getNoteById(noteId, id);
  }

  @Put('update/:id')
  async EditNote(@Req() req: IExtendedRequest, @Param('id') noteId: string, @Body() note: Note) {
    const { id } = req.user;

    if (!note) {
      throw new BadRequestException('Note must not be empty');
    }

    const updatedNote = await this.notesService.editNote(noteId, id, note);
    return {
      message: 'Note updated successfully',
      data: updatedNote
    };
  }

  @Delete('delete/:id')
  async DeleteNote(@Req() req: IExtendedRequest, @Param('id') noteId: string) {
    const { id } = req.user;
    await this.notesService.deleteNote(noteId, id);
    return {
      message: 'Note deleted successfully'
    };
  }
}
