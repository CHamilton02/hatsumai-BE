import { Request } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload
}

export interface User {
  email: string
  password: string
}
