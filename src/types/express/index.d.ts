import { JwtPayload } from 'jsonwebtoken'
import { User } from '../User'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string
    }
  }
}
