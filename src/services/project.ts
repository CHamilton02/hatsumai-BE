import {
  InvalidGenerateProjectRequestFormat,
  UnableToAccessProject,
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
        content:
          'You are an assistant that only responds in strict JSON format. Output must match the following schema exactly: {\"title\": \"string\", \"description\": \"string\", \"tips\": [\"string\"]}',
      },
      {
        role: 'user',
        content: `Generate a project for a Computer Science student given the topics, description and difficulty. Topics: ${req.body.topics}, Description: ${req.body.description}, Difficulty: ${req.body.difficutly}`,
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
  if (!req.user) {
    throw new UserNotLoggedIn('User is not logged in')
  }

  const projectByIdQuery = await db('projects')
    .where('id', req.params.projectId)
    .andWhere('created_by', req.user.email)
    .first()

  if (!projectByIdQuery) {
    throw new UnableToAccessProject('User is not able to access this project')
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
