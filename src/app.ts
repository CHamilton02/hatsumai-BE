import express from 'express'
import user from './routes/user'
import health from './routes/health'
import project from './routes/project'

const app = express()

app.use(express.json())

app.use('/health', health)
app.use('/user', user)
app.use('/project', project)

export default app
