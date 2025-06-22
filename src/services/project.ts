import { Request } from 'express'
import { InvalidGenerateProjectRequestFormat } from '../utils/errors/project'
import OpenAI from 'openai'

export async function generateProject(req: Request) {
  if (
    req.body.topics === undefined ||
    req.body.difficulty === undefined ||
    req.body.description === undefined
  ) {
    throw new InvalidGenerateProjectRequestFormat(
      'Invalid format for generate project request',
    )
  }

  const openai = new OpenAI()

  const generatedProjectResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that only responds in strict JSON format. Output must match the following schema exactly: {\"title\": \"string\", \"description\": \"string\", \"tips\": [\"string\"]}',
      },
      {
        role: 'user',
        content: `Generate a project for a Computer Science student given the topics, description and difficulty. Topics: ${req.body.topics}, Description: ${req.body.description}, Difficulty: ${req.body.difficutly}`,
      },
    ],
  })
}
