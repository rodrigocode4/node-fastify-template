import { ServiceResult, createErrorServiceResult, createSuccessServiceResult} from '../../infrastructure/result.service'
import repository from './user.repository'
import messages from '~/infrastructure/messages'
import { User, UserPick, RequiredUser } from './user.types'

export default {
  get: async (name?: string): Promise<ServiceResult<User[]>> => {
    const users = await repository.get(name)
    return createSuccessServiceResult<User[]>(users)
  },

  getById: async (id: number): Promise<ServiceResult<User>> => {
    const user = await repository.getById(id)
    if (!user) return createErrorServiceResult(messages.notFindById(id))
    return createSuccessServiceResult<User>(user)
  },

  insert: async (user: UserPick): Promise<ServiceResult<UserPick>> => {
    const createdUser = await repository.insert(user)
    return createSuccessServiceResult<UserPick>(createdUser)
  },

  delete: async (id: number): Promise<ServiceResult<number>> => {
    const userExists = await repository.getById(id)
    if (!userExists) return createErrorServiceResult(messages.notFindById(id))
    await repository.delete(id)
    return createSuccessServiceResult<number>(id)
  },

  update: async (user: UserPick & {id: number}): Promise<ServiceResult<RequiredUser>> => {
    const updatedUser = await repository.update(user)
    if (!updatedUser) return createErrorServiceResult(messages.notFindById(Number(updatedUser)))
    return createSuccessServiceResult<RequiredUser>(updatedUser)
  },
}
