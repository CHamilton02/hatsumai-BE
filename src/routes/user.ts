import Router from 'express'
import { forgotPassword, login, register } from '../controllers/user'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/forgot-password', forgotPassword)

export default router
