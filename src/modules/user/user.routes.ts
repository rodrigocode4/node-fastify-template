import { StatusCodes } from 'http-status-codes'
import { App } from '../base/base.types'
import { UserPick } from './user.types'
import { userGetOpts, userPostOpts, userPutOpts } from './user.opts'
import service from './user.service'

export default async (app: App) => {
  app.get('/', userGetOpts, async (req, reply) => {
    const { name } = <{name: string}>req.query
    const { data: users, errors } = await service.get(name)

    const status = errors?.length ? StatusCodes.PARTIAL_CONTENT : StatusCodes.OK

    return reply.status(status).send({ data: { users }, errors })
  })

  app.post('/new', userPostOpts, async (req, reply) => {
    const userPayload = <UserPick>req.body
    const { data: user, errors } = await service.insert(userPayload)

    return reply.status(StatusCodes.CREATED).send({ data: { user }, errors })
  })

  app.put('/update', userPutOpts, async (req, reply) => {
    const userProps = <UserPick>req.body
    const { id } = <{id: number}>req.query

    const { data: user, errors } = await service.update({ id, ...userProps })
    return reply.status(StatusCodes.CREATED).send({ data: { user }, errors })
  })
}
