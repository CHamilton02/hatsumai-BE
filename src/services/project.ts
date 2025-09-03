import {
  InvalidGenerateProjectRequestFormat,
  ProjectDoesNotExist,
} from '../utils/errors/project'
import OpenAI from 'openai'
import db from '../config/database'
import { AuthenticatedRequest } from '../types/User'
import { GeneratedProject, ProjectHistory } from '../types/Project'
import { Request } from 'express'
import { EmailDoesNotExistError, UserNotLoggedIn } from '../utils/errors/user'

export async function generateProjectService(req: AuthenticatedRequest) {
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
        content: `You are an assistant that responds ONLY in valid JSON. 
Do not include explanations, commentary, or text outside of the JSON. 
Your output MUST strictly follow this schema:
{
  "title": "string (a specific, themed project name, not generic)",
  "description": "string (3–5 sentences explaining what the project does, who it helps, and why it is interesting)",
  "tips": ["string (actionable and specific to this project)", "..."]
}

Guidelines:
- Do NOT simply restate the input topics. Instead, combine them into a unique and creative project idea with a clear theme or use case.
- The title should feel like a real project name (e.g., 'AI Study Buddy for Programmers' rather than 'ML-Powered Web Application').
- The description must explain the purpose, theme, and value of the project.
- Tips should help the student actually build or improve this project, tailored to the chosen theme.`,
      },
      {
        role: 'user',
        content: `Generate a project idea for a Computer Science student. 
Inputs:
- Topics: ${req.body.topics}
- Description: ${req.body.description}
- Difficulty: ${req.body.difficulty}

Return only the JSON response following the schema.`,
      },
    ],
  })

  const generatedProject: GeneratedProject = await JSON.parse(
    generatedProjectResponse.choices[0].message.content as string,
  )

  const existingUser = await db('users')
    .where('email', '=', req.user?.email || '')
    .first()

  const generatedProjectId = (
    (await db('projects')
      .insert({
        project_name: generatedProject.title,
        description: generatedProject.description,
        created_by: existingUser ? existingUser.email : null,
      })
      .returning('id')) as Array<{ id: number }>
  )[0].id

  for (let topic of req.body.topics) {
    await db('project_topics').insert({
      project_id: generatedProjectId,
      topic: topic,
    })

    const topicDBVal = await db('topics').where('topic', topic).first()

    if (topicDBVal)
      await db('topics')
        .where('topic', topic)
        .update({ count: topicDBVal.count + 1 })
    else {
      await db('topics').insert({ topic: topic, count: 1 })
    }
  }

  for (let tip of generatedProject.tips) {
    await db('project_tips').insert({
      project_id: generatedProjectId,
      tip: tip,
    })
  }

  return { projectId: generatedProjectId }
}

export async function getTopTenProjectTopicsService(req: Request) {
  const projectTopics = await db('topics')
    .select('topic')
    .orderBy('count', 'desc')
    .limit(10)
  return projectTopics.map((projectTopic) => projectTopic.topic)
}

export async function getProjectHistoryService(req: AuthenticatedRequest) {
  if (!req.user) {
    throw new UserNotLoggedIn('User is not logged in')
  }

  const existingUser = await db('users')
    .where('email', '=', req.user?.email || '')
    .first()

  if (!existingUser) throw new EmailDoesNotExistError('User does not exist')

  const projectsByUser = await db('projects')
    .where('created_by', req.user.email)
    .orderBy('created_at', 'asc')

  const generatedProjectHistory: Array<ProjectHistory> = []

  for (let project of projectsByUser) {
    const topics = (
      await db('project_topics').select('topic').where('project_id', project.id)
    ).map((topic) => topic.topic)
    generatedProjectHistory.push({
      id: project.id,
      title: project.project_name,
      description: project.description,
      topics: topics,
    })
  }

  return generatedProjectHistory
}

export async function getProjectByIdService(req: AuthenticatedRequest) {
  const projectByIdQuery = await db('projects')
    .where('id', req.params.projectId)
    .first()

  if (!projectByIdQuery) {
    throw new ProjectDoesNotExist('Project does not exist.')
  }

  const projectTips = (
    await db('project_tips')
      .select('tip')
      .where('project_id', req.params.projectId)
  ).map((tip) => tip.tip)

  const projectById: GeneratedProject = {
    title: projectByIdQuery.project_name,
    description: projectByIdQuery.description,
    tips: projectTips,
  }

  return projectById
}
