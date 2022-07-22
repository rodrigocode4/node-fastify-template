import { BaseEntity } from '../base/base.repository'

export interface User extends BaseEntity {
  id?: number
  name: string
  age: number
}

export type PartialUser = Partial<Pick<User, 'id' | 'name' | 'age'>>

export type RequiredUser = Required<PartialUser>

export type UserPick = Pick<User, 'age' | 'name'>
