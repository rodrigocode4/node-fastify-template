import { faker } from '@faker-js/faker'
import { User } from '~/modules/user/user.types'
import db from '~/infrastructure/database/prisma.client'

export default () => ({
  user: {
    name: faker.name.firstName(),
    age: faker.datatype.number(55),
  } as (User & { id?: number }),

  withId(id: number) {
    this.user.id = id
    return this
  },

  withName(name: string) {
    this.user.name = name
    return this
  },

  withAge(age: number) {
    this.user.age = age
    return this
  },

  create() {
    return this.user
  },

  async insert() {
    return db.user.create({ data: { ...this.user } })
  },
})
