import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.smallint('age').notNullable()
      table.timestamps(false, true, false)
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users')
}
