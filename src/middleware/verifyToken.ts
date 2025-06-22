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
    return res.status(401).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.user = decoded
    next()
  })
}
