import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types/User'
import jwt from 'jsonwebtoken'

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization

  if (!token) {
    return next()
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return next()
    }

    req.user = decoded
    next()
  })
}
