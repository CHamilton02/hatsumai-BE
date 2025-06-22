import { Request, Response } from 'express'
import { generateProject } from '../services/project'

export async function generate(req: Request, res: Response) {
  try {
    generateProject(req)
    res.status(201).json({ message: 'Project generated successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
