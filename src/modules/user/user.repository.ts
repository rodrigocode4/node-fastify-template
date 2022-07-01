import database from '~/infrastructure/database/database.conn'
import { User } from './user.types'

const table = 'users'

export default {
  get: (name?: string) => {
    const query = database<User>(table)
    if (name) query.whereILike('name', `%${name}%`)
    return query
  },

  getById: (id: number) => database<User>(table)
    .where('id', id).first(),

  insert: async (user: User) => {
    const [id] = await database<User>(table).insert(user)
    return { ...user, id }
  },

  delete: async (id: number) => database<User>(table).where('id', id).delete(),

  update: async (user: User) => {
    const id = await database<User>(table).where('id', user.id).update(user)
    return id ? { ...user } : false
  },
}
