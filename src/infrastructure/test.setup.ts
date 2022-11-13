import util from 'util'
import childProcess from 'child_process'
import app from '../app'
import db from '~/infrastructure/database/prisma.client'

const exec = util.promisify(childProcess.exec)

const setup = async () => {
  await exec('./node_modules/.bin/dotenv -e .env.test ./node_modules/.bin/prisma migrate dev --force')
}

const teardown = async () => {
  await exec(`echo 'drop database ${process.env.DATABASE_URL?.split('/').at(-1)};'`
    + ` | ./node_modules/.bin/prisma db execute --stdin --url=${process.env.DATABASE_URL}`)
}

const truncateTables = async () => {
  await db.$transaction([db.user.deleteMany()])
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
