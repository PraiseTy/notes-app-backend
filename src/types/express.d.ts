import { JwtPayload } from '../middleware/authentication.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
