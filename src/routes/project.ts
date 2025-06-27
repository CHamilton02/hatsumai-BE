import Router from 'express'
import {
  generateProject,
  getTopTenProjectTopics,
  getProjectHistory,
} from '../controllers/project'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.post('/generate', verifyToken, generateProject)

router.get('/topics', getTopTenProjectTopics)

router.get('/history', verifyToken, getProjectHistory)

export default router
