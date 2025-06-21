import Router from 'express'
import { EmailExistsError } from '../utils/errors/emailExistsError'
import { registerUser } from '../services/user'

const router = Router()

router.post('/register', async (req, res): Promise<void> => {
  try {
    await registerUser(req)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    if (error instanceof EmailExistsError)
      res.status(400).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
