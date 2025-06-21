import express from 'express'
import user from './routes/user'
import health from './routes/health'

const app = express()

app.use(express.json())

app.use('/health', health)
app.use('/user', user)

export default app
