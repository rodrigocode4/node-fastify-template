import database from '~/infrastructure/database/database.conn'
import { User, UserPick } from './user.types'

const table = 'users'

const existById = async (id: number) => {
  const { hasId } = await database<User>(table)
    .count('id', { as: 'hasId' })
    .where({ id })
    .first<{hasId: number}>()
  return Boolean(hasId)
}

const get = (name?: string) => {
  const query = database<User>(table)
  if (name) query.whereILike('name', `%${name}%`)
  return query
}

const getById = (id: number) => database<User>(table)
  .where({ id }).first()

const insert = async (user: UserPick) => {
  const [id] = await database<User>(table).insert(user)
  return { ...user, id }
}

const deleteById = async (id: number) => database<User>(table).where({ id }).delete()

const update = async (user: UserPick & { id: number }) => {
  const id = await database<UserPick & { id: number, updatedAt: string }>(table)
    .where({ id: user.id })
    .update({
      name: user.name,
      age: user.id,
      updatedAt: new Date().toISOString().replace('Z', ''),
    })
  return { ...user, id }
}

export default {
  get,
  getById,
  insert,
  deleteById,
  update,
  existById,
}
