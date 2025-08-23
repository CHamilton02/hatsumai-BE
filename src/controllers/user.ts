import { Request, Response } from 'express'
import {
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
} from '../services/user'
import {
  EmailDoesNotExistError,
  EmailExistsError,
  ExistingPasswordResetRequest,
  InvalidCredentialsError,
  InvalidEmailFormatError,
  PasswordResetRequestExpired,
  PasswordResetRequestNotFound,
} from '../utils/errors/user'

export async function register(req: Request, res: Response) {
  try {
    await registerService(req)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    if (
      error instanceof InvalidEmailFormatError ||
      error instanceof EmailExistsError
    ) {
      res.status(400).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const token = await loginService(req)
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    await forgotPasswordService(req)
    res.status(200).json({ message: 'Password reset email sent successfully.' })
  } catch (error) {
    if (error instanceof EmailDoesNotExistError) {
      res.status(404).json({ error: error.message })
      return
    } else if (error instanceof ExistingPasswordResetRequest) {
      res.status(429).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    await resetPasswordService(req)
    res.status(200).json({ message: 'Password change succeeded.' })
  } catch (error) {
    if (error instanceof PasswordResetRequestNotFound) {
      res.status(404).json({ error: error.message })
      return
    } else if (error instanceof PasswordResetRequestExpired) {
      res.status(401).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
