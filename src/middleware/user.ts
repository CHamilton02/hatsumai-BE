import { NextFunction, Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  jwt.verify(
    token,
    'secret',
    (
      err: VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined,
    ) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      req.user = decoded
      next()
    },
  )
}
