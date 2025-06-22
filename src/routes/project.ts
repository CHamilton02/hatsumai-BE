import Router from 'express'
import { generate } from '../controllers/project'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.post('/generate', verifyToken, generate)

export default router
