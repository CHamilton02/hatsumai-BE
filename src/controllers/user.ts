import { Request, Response } from 'express'
import { registerUser } from '../services/user'
import { EmailExistsError } from '../utils/errors/emailExistsError'

export async function register(req: Request, res: Response) {
  try {
    await registerUser(req)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    if (error instanceof EmailExistsError)
      res.status(400).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
}
