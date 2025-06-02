import { Schema, Types } from 'mongoose';

export interface Tag {
  id: Types.ObjectId;
  name: string;
}

export const TagSchema = new Schema<Tag>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new Types.ObjectId()
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true, _id: false }
);
