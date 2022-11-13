import { StatusCodes } from 'http-status-codes'
import { App } from '../base/base.types'
import { User } from './user.types'
import {
  userDeleteByIdOpts,
  userGetByIdOpts, userGetOpts, userPostOpts, userPutOpts
} from './user.opts'
import service from './user.service'

export default async (app: App) => {
  app.get('/', userGetOpts, async (req, reply) => {
    const { name } = <{ name: string }>req.query
    const { data, errors } = await service.get(name)

    let status = StatusCodes.OK
    if (errors) {
      status = StatusCodes.NOT_FOUND
    }

    return reply.status(status).send({ data, errors })
  })

  app.get('/:id', userGetByIdOpts, async (req, reply) => {
    const { id } = <{ id: number }>req.params
    const { data, errors } = await service.getById(id)

    let status = StatusCodes.OK
    if (errors) {
      status = StatusCodes.NOT_FOUND
    }

    return reply.status(status).send({ data, errors })
  })

  app.post('/new', userPostOpts, async (req, reply) => {
    const userPayload = <User>req.body
    const { data, errors } = await service.insert(userPayload)

    return reply.status(StatusCodes.CREATED).send({ data, errors })
  })

  app.put('/update', userPutOpts, async (req, reply) => {
    const userProps = <User>req.body
    const { id } = <{ id: number }>req.query

    const { data, errors } = await service.update({ id, ...userProps })
    return reply.status(StatusCodes.CREATED).send({ data, errors })
  })

  app.delete('/delete/:id', userDeleteByIdOpts, async (req, reply) => {
    const { id } = <{ id: number }>req.params
    const { data, errors } = await service.deleteById(id)

    let status = StatusCodes.OK
    if (errors) {
      status = StatusCodes.NOT_FOUND
    }

    return reply.status(status).send({ data, errors })
  })
}
