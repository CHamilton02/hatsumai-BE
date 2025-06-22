import {
  EmailExistsError,
  InvalidCredentialsError,
  InvalidEmailFormatError,
} from '../utils/errors/user'
import { Request } from 'express'
import db from '../config/database'
import bcrypt from 'bcryptjs'
import { User } from '../types/User'
import jwt from 'jsonwebtoken'

export async function registerUser(req: Request) {
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

export async function loginUser(req: Request) {
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
