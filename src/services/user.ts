import {
  EmailDoesNotExistError,
  EmailExistsError,
  ExistingPasswordResetRequest,
  InvalidCredentialsError,
  InvalidEmailFormatError,
} from '../utils/errors/user'
import { Request } from 'express'
import db from '../config/database'
import bcrypt from 'bcryptjs'
import { User } from '../types/User'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import forgotPasswordEmailHTML from '../utils/forgotPasswordEmailHTML'
import { sendEmail } from '../config/mail'

export async function registerService(req: Request) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    throw new InvalidEmailFormatError('Invalid email format used')
  }
  const existingUser = await db('users')
    .where('email', '=', req.body.email)
    .first()
  if (existingUser) {
    throw new EmailExistsError('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const newUser: User = {
    email: req.body.email,
    password: hashedPassword,
  }

  await db('users').insert(newUser)
}

export async function loginService(req: Request) {
  const user = await db('users').where('email', '=', req.body.email).first()
  if (!user) {
    throw new InvalidCredentialsError('Invalid credentials')
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password)
  if (!passwordMatch) {
    throw new InvalidCredentialsError('Invalid credentials')
  }

  const token = jwt.sign({ email: user.email }, 'secret')
  return token
}

export async function forgotPasswordService(req: Request) {
  const user = await db('users').where('email', '=', req.body.email).first()
  if (!user) {
    throw new EmailDoesNotExistError('Email does not exist.')
  }

  const existingUserPasswordResetRequest = await db('user_password_resets')
    .where('user_email', '=', req.body.email)
    .first()

  if (existingUserPasswordResetRequest) {
    const expirationDate = new Date(
      existingUserPasswordResetRequest.requested_at.getTime() + 10 * 60000,
    )
    const currentDate = new Date()

    if (currentDate < expirationDate) {
      throw new ExistingPasswordResetRequest(
        'There is an existing password reset request.',
      )
    }

    await db('user_password_resets')
      .where('user_email', '=', req.body.email)
      .del()
  }

  const passwordResetToken = crypto.randomBytes(16).toString('hex')

  const passwordResetUrl = `${process.env.APP_URL}/reset-password?token=${passwordResetToken}`

  try {
    const html = forgotPasswordEmailHTML(req.body.email, passwordResetUrl)

    await sendEmail(req.body.email, 'Reset Password', html)

    await db('user_password_resets').insert({
      user_email: req.body.email,
      token: passwordResetToken,
    })
  } catch (error) {
    throw new Error('Something went wrong sending the email.')
  }
}
