import { Schema, Types, Document } from 'mongoose';
import { TagSchema } from './tags.models';

interface Tag {
  id: Types.ObjectId;
  name: string;
}
export interface Note extends Document {
  title: string;
  body: string;
  writer: Types.ObjectId;
  tags: Tag[];
  isArchived: boolean;
}

export const NotesSchema = new Schema<Note>(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [TagSchema],
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
