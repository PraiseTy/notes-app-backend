import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class AddNotesDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Body is required' })
  body: string;

  @IsMongoId({ message: 'Writer must be a valid ObjectId' })
  @IsOptional()
  writer?: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  isArchived: boolean;
}
