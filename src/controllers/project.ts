import { Request, Response } from 'express'
import {
  generateProjectService,
  getProjectHistoryService,
  getTopTenProjectTopicsService,
} from '../services/project'
import { AuthenticatedRequest } from '../types/User'
import { InvalidGenerateProjectRequestFormat } from '../utils/errors/project'
import { EmailDoesNotExistError } from '../utils/errors/user'

export async function generateProject(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const generatedProject = await generateProjectService(req)
    res.status(201).json(generatedProject)
  } catch (error) {
    if (error instanceof InvalidGenerateProjectRequestFormat)
      res.status(400).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getTopTenProjectTopics(req: Request, res: Response) {
  try {
    const projectTopics = await getTopTenProjectTopicsService(req)
    res.status(200).json({ projectTopics })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getProjectHistory(req: Request, res: Response) {
  try {
    const projectHistory = await getProjectHistoryService(req)
    res.status(200).json(projectHistory)
  } catch (error) {
    if (error instanceof EmailDoesNotExistError)
      res.status(404).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
}
