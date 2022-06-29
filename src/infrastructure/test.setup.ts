import knex from 'knex'
import app from '../../app'
import dotenv from './dotenv'
import { getConfig } from './database'


const tables = [
  'users',
]

const setup = async () => {
  await dotenv(app)

  const knexWithoutDb = knex(getConfig(true))
  await knexWithoutDb.raw(`create database if not exists ${process.env.DB_NAME};`)

  const config = getConfig()
  const knexWithDb = knex(config)

  await knexWithDb.migrate.latest()
  await knexWithDb.destroy()
}

const teardown = async () => {
  const knexWithoutDb = knex(getConfig(true))
  await knexWithoutDb.raw(`drop database ${process.env.DB_NAME};`)
  knexWithoutDb.destroy()
}

const truncateTables = async () => {
  const database = knex(getConfig())
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
})
