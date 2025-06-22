import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services/user'
import { EmailExistsError, InvalidCredentialsError } from '../utils/errors/user'

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

export async function login(req: Request, res: Response) {
  try {
    const token = await loginUser(req)
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      res.status(401).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
}
