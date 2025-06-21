import { Request, Response } from 'express'
import db from '../../database'

export async function database(req: Request, res: Response) {
  try {
    await db.raw('SELECT 1+1 AS result')
    res.status(201).json({ message: 'Database is healthy.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
