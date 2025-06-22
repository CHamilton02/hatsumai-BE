import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user?: { email: string; password: string }
}

export interface User {
  email: string
  password: string
}
