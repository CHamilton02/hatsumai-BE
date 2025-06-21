import { Router } from 'express'
import { database } from '../controllers/health'

const router = Router()

router.get('/database', database)

export default router
