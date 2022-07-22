import { Knex } from 'knex'
import dotenvLoad from './src/infrastructure/dotenv.load'
import typeCast from './src/infrastructure/database/database.utils'

dotenvLoad()

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      typeCast,
    },
    migrations: { tableName: 'migrations' },
  },
}

export default config
