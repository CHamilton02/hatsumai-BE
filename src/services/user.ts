import { EmailExistsError } from '../utils/errors/emailExistsError'
import { Request } from 'express'
import db from '../../database'
import bcrypt from 'bcryptjs'
import { User } from '../types/User'

export async function registerUser(req: Request) {
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
