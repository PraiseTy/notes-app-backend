import { IsNotEmpty } from 'class-validator';

export class addNotesDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Body is required' })
  body: string;

  tags: string[];

  createdAt: Date;

  updatedAt: Date;
}
