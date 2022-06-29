import knex, { Knex } from 'knex'
import knexStringCase from 'knex-stringcase'

export const getConfig = (withoutDatabase = false): Knex.Config => ({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: withoutDatabase ? undefined : process.env.DB_NAME,
    charset: 'utf8'
  },
  migrations: { tableName: 'migrations' },
  debug: process.env.JEST_WORKER_ID ? false : Boolean(process.env.DB_DEBUG),

})

const config = getConfig()
const options = knexStringCase(config)

export default knex(options)
