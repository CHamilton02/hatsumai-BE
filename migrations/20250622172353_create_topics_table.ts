import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('topics', (t) => {
    t.string('topic').notNullable().primary()
    t.integer('count').unsigned().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('topics')
}
