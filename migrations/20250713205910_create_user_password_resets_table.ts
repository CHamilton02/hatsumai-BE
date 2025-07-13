import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_password_resets', (t) => {
    t.increments('id').primary()
    t.string('user_email').notNullable()
    t.string('token').notNullable().index()
    t.dateTime('requested_at', { precision: 6 })
      .notNullable()
      .defaultTo(knex.fn.now(6))
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_password_resets')
}
