import {
  ServiceResult,
  createErrorServiceResult,
  createSuccessServiceResult
} from '~/infrastructure/result.service'
import messages from '~/infrastructure/messages'
import repository from './user.repository'
import { User, UserPick, RequiredUser } from './user.types'

const existById = async (id: number) => repository.existById(id)

const get = async (name?: string): Promise<ServiceResult<{ users: User[] }>> => {
  const users = await repository.get(name)
  if (users.length) return createSuccessServiceResult({ users })
  return createErrorServiceResult(messages.noDataFound)
}

const getById = async (id: number): Promise<ServiceResult<{user: User}>> => {
  const user = await repository.getById(id)
  if (!user) return createErrorServiceResult(messages.notFindById(id))
  return createSuccessServiceResult<{ user: User}>({ user })
}

const insert = async (user: UserPick): Promise<ServiceResult<{user: UserPick}>> => {
  const createdUser = await repository.insert(user)
  return createSuccessServiceResult({ user: createdUser })
}

const deleteById = async (id: number): Promise<ServiceResult<{ id: number }>> => {
  const userExists = await existById(id)
  if (!userExists) return createErrorServiceResult(messages.notFindById(id))
  await repository.deleteById(id)
  return createSuccessServiceResult<{ id: number }>({ id })
}

const update = async (user: UserPick & { id: number }): Promise<ServiceResult<{ user: RequiredUser }>> => {
  const updatedUser = await repository.update(user)
  return createSuccessServiceResult({ user: updatedUser })
}

export default {
  get,
  getById,
  insert,
  deleteById,
  update,
  existById,
}
