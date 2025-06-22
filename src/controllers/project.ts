import { Request, Response } from 'express'
import { generateProject } from '../services/project'
import { AuthenticatedRequest } from '../types/User'
import { InvalidGenerateProjectRequestFormat } from '../utils/errors/project'

export async function generate(req: AuthenticatedRequest, res: Response) {
  try {
    const generatedProject = await generateProject(req)
    res.status(201).json(generatedProject)
  } catch (error) {
    if (error instanceof InvalidGenerateProjectRequestFormat)
      res.status(400).json({ error: error.message })
    res.status(500).json({ error: 'Internal server error' })
  }
}
