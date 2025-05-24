import { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
  createJWT(): string;
}

export const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (this: User, userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

UserSchema.methods.createJWT = function (this: User) {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_LIFETIME || '30d';

  if (!secret) {
    throw new Error('JWT_SECRET or JWT_LIFETIME is not defined');
  }

  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email
    },
    secret,
    {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn']
    }
  );
};
