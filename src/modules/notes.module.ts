import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from '../models/notes.models';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../service/notes.service';
import { JwtMiddleware } from '../middleware/authentication.middleware';

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: 'Note', schema: NotesSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(NotesController);
  }
}
