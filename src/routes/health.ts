import { Router } from 'express'
import db from '../../database'

const router = Router()

router.get('/database', async (req, res) => {
  try {
    await db.raw('SELECT 1+1 AS result')
    res.status(201).json({ message: 'Database is healthy.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
