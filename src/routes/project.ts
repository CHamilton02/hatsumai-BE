import Router from 'express'
import { generateProject, getTopTenProjectTopics } from '../controllers/project'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.post('/generate', verifyToken, generateProject)

router.get('/topics', getTopTenProjectTopics)

export default router
