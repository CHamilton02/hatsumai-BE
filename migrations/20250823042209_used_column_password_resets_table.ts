import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('user_password_resets', (t) => {
    t.boolean('used').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('user_password_resets', (t) => {
    t.dropColumn('used')
  })
}
