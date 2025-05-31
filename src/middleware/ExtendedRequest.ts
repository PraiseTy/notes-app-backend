import { Request } from 'express';

export class IExtendedRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
