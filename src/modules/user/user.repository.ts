import database from '~/infrastructure/database/database.conn'
import { User, UserPick } from './user.types'

export const table = 'users'


export default {
  get: (name?: string) => {
    const query = database<User>(table)
    if (name) query.whereILike('name', `%${name}%`)
    return query
  },

  getById: (id: number) => database<User>(table)
    .where('id', id).first(),

  insert: async (user: UserPick) => {
    const [id] = await database<User>(table).insert(user)
    return { ...user, id }
  },

  delete: async (id: number) => database<User>(table).where({ id }).delete(),

  update: async (user: UserPick & {id: number}) => {
    const id = await database<UserPick & {id: number, updatedAt: string}>(table)
      .where({ id: user.id })
      .update({name: user.name, age: user.id, updatedAt: new Date().toISOString().replace('Z', '')})
    return id ? { ...user } : false
  },
}
