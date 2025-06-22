import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('projects', (t) => {
    t.increments('id').unsigned().primary()
    t.dateTime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    t.string('project_name').notNullable()
    t.text('description').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('projects')
}
