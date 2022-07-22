import knex from 'knex'
import app from '../app'
import dotenvLoad from './dotenv.load'
import database, { getConfig } from './database/database.conn'

const tables = [
  'users'
]

const setup = async () => {
  await dotenvLoad()

  const knexWithoutDb = knex(getConfig(true))
  await knexWithoutDb.raw(`create database if not exists ${process.env.DB_NAME};`)
  await knexWithoutDb.destroy()

  await database.migrate.latest()
}

const teardown = async () => {
  await database.raw(`drop database ${process.env.DB_NAME};`)
  await database.destroy()
}

const truncateTables = async () => {
  await Promise.all(tables.map((table) => database(table).truncate()))
}

beforeEach(async () => {
  jest.clearAllMocks()
  await truncateTables()
})

beforeAll(async () => {
  await setup()
})

afterAll(async () => {
  await teardown()
  await app.close()
})
