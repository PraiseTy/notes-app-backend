import { Schema, Types, Document } from 'mongoose';

export interface Note extends Document {
  title: string;
  body: string;
  writer: Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const NotesSchema = new Schema<Note>({
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
