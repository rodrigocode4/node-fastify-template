import { User } from './user.types'
import db from '~/infrastructure/database/prisma.client'

const existById = async (id: number) => !!(await db.user.count({ where: { id } }))

const get = (name?: string) => {
  let usersDb = null

  if (!name) {
    usersDb = db.user.findMany()
  }

  usersDb = db.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  })

  return usersDb
}

const getById = (id: number) => db.user.findFirst({ where: { id } })

const insert = async (user: User) => db.user.create({ data: { ...user } })

const deleteById = async (id: number) => db.user.delete({ where: { id } })

const update = async (
  user: User & { id: number }
) => db.user.update({
  data: {
    name: user.name,
    age: user.age,
  },
  where: {
    id: user.id,
  },
})

export default {
  get,
  getById,
  insert,
  deleteById,
  update,
  existById,
}
