import knex from 'knex'
import config from './knexfile'

const environment = process.env.NODE_ENV || 'development'
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

export default db
