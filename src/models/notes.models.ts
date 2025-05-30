import { Schema } from 'mongoose';

interface Note {
  title: string;
  body: string;
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
  tags: {
    type: [String]
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});
