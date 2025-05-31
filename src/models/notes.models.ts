import { Schema, Types, Document } from 'mongoose';

export interface Note extends Document {
  title: string;
  body: string;
  writer: Types.ObjectId;
  tags: string[];
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
    tags: {
      type: [String]
    }
  },
  { timestamps: true }
);
