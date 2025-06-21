import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('project_tips', (t) => {
    t.integer('project_id').unsigned(), t.string('tip').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('project_tips')
}
