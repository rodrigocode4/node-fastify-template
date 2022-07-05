import knex, { Knex } from 'knex'
import knexStringCase from 'knex-stringcase'
import dotenvLoad from '../dotenv.load'
import typeCast from './database.utils'

export const getConfig = (withoutDatabase = false): Knex.Config => ({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: withoutDatabase ? undefined : process.env.DB_NAME,
    typeCast,
  },
  migrations: { tableName: 'migrations' },
})

dotenvLoad()
const options = knexStringCase(getConfig())

export default knex(options)
