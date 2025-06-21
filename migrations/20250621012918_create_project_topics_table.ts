import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('project_topics', (t) => {
    t.integer('project_id').unsigned().notNullable(),
      t.string('topic').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('project_topics')
}
