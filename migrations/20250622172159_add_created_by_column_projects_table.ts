import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('projects', (t) => {
    t.string('created_by').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('projects', (t) => {
    t.dropColumn('created_by')
  })
}
