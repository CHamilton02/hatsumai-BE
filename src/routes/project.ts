import Router from 'express'
import { generate } from '../controllers/project'

const router = Router()

router.post('/generate', generate)

export default router
