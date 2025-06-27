import Router from 'express'
import {
  generateProject,
  getTopTenProjectTopics,
  getProjectHistory,
  getProjectById,
} from '../controllers/project'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.post('/generate', verifyToken, generateProject)

router.get('/topics', getTopTenProjectTopics)

router.get('/history', verifyToken, getProjectHistory)

router.get('/:projectId', verifyToken, getProjectById)

export default router
