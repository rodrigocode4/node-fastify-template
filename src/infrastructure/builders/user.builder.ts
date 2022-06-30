import { faker } from '@faker-js/faker'
import { User } from '../../modules/user/user.types'
import database from '../database/database.conn'

export default () => ({
  user: {
    name: faker.name.firstName(),
    age: faker.datatype.number(55),
  } as User,

  withName(name: string) {
    this.user.name = name
    return this
  },

  withAge(age: number) {
    this.user.age = age
    return this
  },

  create(): User {
    return this.user
  },

  async insert(): Promise<User> {
    const [id] = await database<User>('users').insert(this.user)
    return database<User>('users').select().where({id}).first<User>()
  }
})
